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
import {WafPolicy} from '../models';
import {WafPolicyRepository} from '../repositories';

export class WafPolicyController {
  constructor(
    @repository(WafPolicyRepository)
    public wafPolicyRepository: WafPolicyRepository,
  ) {}

  @post('/waf-policies', {
    responses: {
      '200': {
        description: 'WafPolicy model instance',
        content: {'application/json': {schema: {'x-ts-type': WafPolicy}}},
      },
    },
  })
  async create(@requestBody() wafPolicy: WafPolicy): Promise<WafPolicy> {
    return await this.wafPolicyRepository.create(wafPolicy);
  }

  @get('/waf-policies/count', {
    responses: {
      '200': {
        description: 'WafPolicy model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(WafPolicy)) where?: Where,
  ): Promise<Count> {
    return await this.wafPolicyRepository.count(where);
  }

  @get('/waf-policies', {
    responses: {
      '200': {
        description: 'Array of WafPolicy model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': WafPolicy}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(WafPolicy))
    filter?: Filter,
  ): Promise<WafPolicy[]> {
    return await this.wafPolicyRepository.find(filter);
  }

  @patch('/waf-policies', {
    responses: {
      '200': {
        description: 'WafPolicy PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() wafPolicy: WafPolicy,
    @param.query.object('where', getWhereSchemaFor(WafPolicy)) where?: Where,
  ): Promise<Count> {
    return await this.wafPolicyRepository.updateAll(wafPolicy, where);
  }

  @get('/waf-policies/{id}', {
    responses: {
      '200': {
        description: 'WafPolicy model instance',
        content: {'application/json': {schema: {'x-ts-type': WafPolicy}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<WafPolicy> {
    return await this.wafPolicyRepository.findById(id);
  }

  @patch('/waf-policies/{id}', {
    responses: {
      '204': {
        description: 'WafPolicy PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() wafPolicy: WafPolicy,
  ): Promise<void> {
    await this.wafPolicyRepository.updateById(id, wafPolicy);
  }

  @del('/waf-policies/{id}', {
    responses: {
      '204': {
        description: 'WafPolicy DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.wafPolicyRepository.deleteById(id);
  }
}
