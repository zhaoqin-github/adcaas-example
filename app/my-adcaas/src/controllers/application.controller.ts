import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  del,
  requestBody,
} from '@loopback/rest';
import {Application} from '../models';
import {ApplicationRepository} from '../repositories';
import {WafPolicyRepository} from '../repositories';
import {ADCRepository} from '../repositories';
import {AS3Service} from '../services';

export class ApplicationController {
  constructor(
    @repository(ApplicationRepository)
    public applicationRepository: ApplicationRepository,
    @repository(WafPolicyRepository)
    public wafPolicyRepository: WafPolicyRepository,
    @repository(ADCRepository)
    public adcRepository: ADCRepository,
    @inject('services.AS3Service') protected as3Service: AS3Service,
  ) {}

  @post('/applications', {
    responses: {
      '200': {
        description: 'Application model instance',
        content: {'application/json': {schema: {'x-ts-type': Application}}},
      },
    },
  })
  async create(@requestBody() application: Application): Promise<Application> {
    return await this.applicationRepository.create(application);
  }

  @get('/applications/count', {
    responses: {
      '200': {
        description: 'Application model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Application)) where?: Where,
  ): Promise<Count> {
    return await this.applicationRepository.count(where);
  }

  @get('/applications', {
    responses: {
      '200': {
        description: 'Array of Application model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Application}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Application))
    filter?: Filter,
  ): Promise<Application[]> {
    return await this.applicationRepository.find(filter);
  }

  @patch('/applications', {
    responses: {
      '200': {
        description: 'Application PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() application: Application,
    @param.query.object('where', getWhereSchemaFor(Application)) where?: Where,
  ): Promise<Count> {
    return await this.applicationRepository.updateAll(application, where);
  }

  @get('/applications/{id}', {
    responses: {
      '200': {
        description: 'Application model instance',
        content: {'application/json': {schema: {'x-ts-type': Application}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Application> {
    return await this.applicationRepository.findById(id);
  }

  @patch('/applications/{id}', {
    responses: {
      '204': {
        description: 'Application PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() application: Application,
  ): Promise<void> {
    await this.applicationRepository.updateById(id, application);
  }

  @del('/applications/{id}', {
    responses: {
      '204': {
        description: 'Application DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.applicationRepository.deleteById(id);
  }

  @post('/applications/{id}/deploy', {
    responses: {
      '204': {
        description: 'Application deploy success',
      },
      '404': {
        description: 'Application not found',
      },
    },
  })
  async deployById(@param.path.string('id') id: string): Promise<void> {
    let app = await this.applicationRepository.findById(id);
    let waf = await this.wafPolicyRepository.findById(app.waf_policy_id);
    let adc = await this.adcRepository.findById(app.adc_id);

    let declaration = {
      class: 'ADC',
      schemaVersion: '3.0.0',
      id: 'zhaoqin',
      label: 'Sample1',
      remark: 'Simple HTTP application',
      Tenant1: {
        class: 'Tenant',
        App1: {
          class: 'Application',
          template: 'http',
          serviceMain: {
            class: 'Service_HTTP',
            virtualAddresses: ['10.0.1.10'],
            pool: 'web_pool',
            policyWAF: {
              use: 'my_waf',
            },
          },
          web_pool: {
            class: 'Pool',
            monitors: ['http'],
            members: [
              {
                servicePort: 80,
                serverAddresses: ['192.0.1.10', '192.0.1.11'],
              },
            ],
          },
          my_waf: {
            class: 'WAF_Policy',
            url: waf.url,
          },
        },
      },
    };

    await this.as3Service.deploy(adc.address, adc.port, declaration);
    return;
  }
}
