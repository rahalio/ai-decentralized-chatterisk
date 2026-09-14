import type { RetentionRepository } from "@chatterisk/services/comments";

let policy = { rawCommentDays: 30, aggregateRetain: true };

export class RetentionRepositoryDdb implements RetentionRepository {
  constructor(private readonly dynamoClient: any) {}
  async getCommentRetentionPolicy(_input: Parameters<RetentionRepository['getCommentRetentionPolicy']>[0]) {
    return { data: policy, meta: { generatedAt: new Date().toISOString() } } as any;
  }
  async updateCommentRetentionPolicy(input: Parameters<RetentionRepository['updateCommentRetentionPolicy']>[0]) {
    policy = { ...policy, ...(input as object) } as typeof policy;
    return { data: policy, meta: { generatedAt: new Date().toISOString() } } as any;
  }
}
