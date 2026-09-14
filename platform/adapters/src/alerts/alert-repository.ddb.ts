import type { AlertRepository } from "@chatterisk/services/alerts";
import { memory, memoryList } from "../_shared/chatterisk-memory.js";

export class AlertRepositoryDdb implements AlertRepository {
  constructor(private readonly dynamoClient: any) {}
  async listRiskAlerts(input: Parameters<AlertRepository['listRiskAlerts']>[0]) {
    const status = (input as any)?.status;
    const projectId = (input as any)?.projectId;
    return memoryList(
      memory.alerts,
      (row) => (!status || row.status === status) && (!projectId || row.projectId === projectId),
    ) as any;
  }
}
