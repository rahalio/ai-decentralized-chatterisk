import type { AlertPolicyRepository } from "@chatterisk/services/alerts";
import { memory, memoryGet, memoryList, memoryPatch, memoryPut } from "../_shared/chatterisk-memory.js";

export class AlertPolicyRepositoryDdb implements AlertPolicyRepository {
  constructor(private readonly dynamoClient: any) {}
  async listAlertPolicies(_input: Parameters<AlertPolicyRepository['listAlertPolicies']>[0]) {
    return memoryList(memory.policies) as any;
  }
  async createAlertPolicy(input: Parameters<AlertPolicyRepository['createAlertPolicy']>[0]) {
    return memoryPut(memory.policies, 'plc', { ...(input as object), niaLocked: true }, 'policyId') as any;
  }
  async getAlertPolicy(input: Parameters<AlertPolicyRepository['getAlertPolicy']>[0]) {
    return memoryGet(memory.policies, (input as any).policyId) as any;
  }
  async updateAlertPolicy(input: Parameters<AlertPolicyRepository['updateAlertPolicy']>[0]) {
    return memoryPatch(memory.policies, String((input as any).policyId), { ...(input as object) }) as any;
  }
}
