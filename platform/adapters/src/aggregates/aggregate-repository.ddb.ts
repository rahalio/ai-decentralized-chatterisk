import type { AggregateRepository } from "@chatterisk/services/aggregates";
import { memory, memoryList } from "../_shared/chatterisk-memory.js";

export class AggregateRepositoryDdb implements AggregateRepository {
  constructor(private readonly dynamoClient: any) {}
  async listProjectAggregates(input: Parameters<AggregateRepository['listProjectAggregates']>[0]) {
    const projectId = (input as any)?.projectId;
    const window = (input as any)?.window;
    return memoryList(
      memory.aggregates,
      (row) => (!projectId || row.projectId === projectId) && (!window || row.window === window),
    ) as any;
  }
}
