import {Entity, model, property} from '@loopback/repository';

@model()
export class Application extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  adc_id: string;

  @property({
    type: 'string',
  })
  waf_policy_id?: string;

  constructor(data?: Partial<Application>) {
    super(data);
  }
}
