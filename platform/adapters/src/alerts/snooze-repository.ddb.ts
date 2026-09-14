import type { SnoozeRepository } from "@chatterisk/services/alerts";
import { memory, memoryPatch } from "../_shared/chatterisk-memory.js";

export class SnoozeRepositoryDdb implements SnoozeRepository {
  constructor(private readonly dynamoClient: any) {}
  async snoozeAlert(input: Parameters<SnoozeRepository['snoozeAlert']>[0]) {
    return memoryPatch(memory.alerts, String((input as any).alertId), {
      status: 'snoozed',
      snoozedUntil: (input as any).until,
    }) as any;
  }
}
