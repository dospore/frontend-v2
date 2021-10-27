import Service from '../../balancer-subgraph.service';
import queryBuilder from './query';
import { PoolSwap, QueryBuilder } from '../../types';

export default class PoolSwaps {
  service: Service;
  query: QueryBuilder;

  constructor(service: Service, query: QueryBuilder = queryBuilder) {
    this.service = service;
    this.query = query;
  }

  public async get(args = {}, attrs = {}): Promise<PoolSwap[]> {
    const query = this.query(args, attrs);
    const { swaps } = await this.service.client.get(query);

    return this.serialize(swaps);
  }

  serialize(swaps: PoolSwap[]) {
    return swaps.map(swap => ({
      ...swap,
      timestamp: swap.timestamp * 1000
    }));
  }
}
