import {Entity, model, property} from '@loopback/repository';

@model()
export class ADC extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'number',
    required: true,
    default: 443,
  })
  port: number;

  constructor(data?: Partial<ADC>) {
    super(data);
  }
}
