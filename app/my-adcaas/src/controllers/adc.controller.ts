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
import {ADC} from '../models';
import {ADCRepository} from '../repositories';

export class ADCController {
  constructor(
    @repository(ADCRepository)
    public adcRepository: ADCRepository,
  ) {}

  @post('/adcs', {
    responses: {
      '200': {
        description: 'ADC model instance',
        content: {'application/json': {schema: {'x-ts-type': ADC}}},
      },
    },
  })
  async create(@requestBody() adc: ADC): Promise<ADC> {
    return await this.adcRepository.create(adc);
  }

  @get('/adcs/count', {
    responses: {
      '200': {
        description: 'ADC model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(ADC)) where?: Where,
  ): Promise<Count> {
    return await this.adcRepository.count(where);
  }

  @get('/adcs', {
    responses: {
      '200': {
        description: 'Array of ADC model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': ADC}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(ADC)) filter?: Filter,
  ): Promise<ADC[]> {
    return await this.adcRepository.find(filter);
  }

  @patch('/adcs', {
    responses: {
      '200': {
        description: 'ADC PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() adc: ADC,
    @param.query.object('where', getWhereSchemaFor(ADC)) where?: Where,
  ): Promise<Count> {
    return await this.adcRepository.updateAll(adc, where);
  }

  @get('/adcs/{id}', {
    responses: {
      '200': {
        description: 'ADC model instance',
        content: {'application/json': {schema: {'x-ts-type': ADC}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<ADC> {
    return await this.adcRepository.findById(id);
  }

  @patch('/adcs/{id}', {
    responses: {
      '204': {
        description: 'ADC PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() adc: ADC,
  ): Promise<void> {
    await this.adcRepository.updateById(id, adc);
  }

  @del('/adcs/{id}', {
    responses: {
      '204': {
        description: 'ADC DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.adcRepository.deleteById(id);
  }
}
