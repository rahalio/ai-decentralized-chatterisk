import type { AcknowledgeRepository } from "@chatterisk/services/alerts";
import { memory, memoryPatch } from "../_shared/chatterisk-memory.js";

export class AcknowledgeRepositoryDdb implements AcknowledgeRepository {
  constructor(private readonly dynamoClient: any) {}
  async acknowledgeAlert(input: Parameters<AcknowledgeRepository['acknowledgeAlert']>[0]) {
    return memoryPatch(memory.alerts, String((input as any).alertId), {
      status: 'acknowledged',
      acknowledgedAt: new Date().toISOString(),
    }) as any;
  }
}
