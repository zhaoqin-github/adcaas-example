import {Entity, model, property} from '@loopback/repository';

@model()
export class WafPolicy extends Entity {
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
  url: string;

  constructor(data?: Partial<WafPolicy>) {
    super(data);
  }
}
