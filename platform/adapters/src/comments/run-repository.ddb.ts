import type { RunRepository } from "@chatterisk/services/comments";
import { memoryId } from "../_shared/chatterisk-memory.js";

export class RunRepositoryDdb implements RunRepository {
  constructor(private readonly dynamoClient: any) {}
  async runCommentRetentionJob(_input: Parameters<RunRepository['runCommentRetentionJob']>[0]) {
    return {
      data: {
        jobId: memoryId('rtn'),
        status: 'done',
        purgedCount: 0,
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
      },
      meta: { generatedAt: new Date().toISOString() },
    } as any;
  }
}
