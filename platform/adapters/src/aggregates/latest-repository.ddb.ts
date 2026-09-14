import type { LatestRepository } from "@chatterisk/services/aggregates";
import { memory, seedChatteriskDemo } from "../_shared/chatterisk-memory.js";

export class LatestRepositoryDdb implements LatestRepository {
  constructor(private readonly dynamoClient: any) {}
  async getLatestAggregate(input: Parameters<LatestRepository['getLatestAggregate']>[0]) {
    seedChatteriskDemo();
    const projectId = (input as any)?.projectId;
    const addr = (input as any)?.contractAddress;
    const hit = [...memory.aggregates.values()].find(
      (r) => (projectId && r.projectId === projectId) || (addr && r.contractAddress === addr),
    ) ?? [...memory.aggregates.values()][0];
    return { data: hit ?? null, meta: { generatedAt: new Date().toISOString() } } as any;
  }
}
