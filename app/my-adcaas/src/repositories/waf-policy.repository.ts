import {DefaultCrudRepository} from '@loopback/repository';
import {WafPolicy} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class WafPolicyRepository extends DefaultCrudRepository<
  WafPolicy,
  typeof WafPolicy.prototype.id
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(WafPolicy, dataSource);
  }
}
