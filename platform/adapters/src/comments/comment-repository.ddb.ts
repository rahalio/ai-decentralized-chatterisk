import type { CommentRepository } from "@chatterisk/services/comments";
import { memory, memoryGet, memoryList, memoryPut } from "../_shared/chatterisk-memory.js";

export class CommentRepositoryDdb implements CommentRepository {
  constructor(private readonly dynamoClient: any) {}

  async listProjectComments(input: Parameters<CommentRepository['listProjectComments']>[0]) {
    const projectId = (input as any).projectId;
    return memoryList(memory.comments, (row) => !projectId || row.projectId === projectId) as any;
  }

  async ingestComment(input: Parameters<CommentRepository['ingestComment']>[0]) {
    return memoryPut(
      memory.comments,
      'cmt',
      {
        ...(input as object),
        textPurged: false,
        botSuspect: false,
        tanhScore: 0,
        positiveProbability: 0.5,
        negativeProbability: 0.5,
        modelVersion: 'lstm-cnn-tanh-v1',
        disclaimer: 'Risk intelligence only; not investment advice.',
      },
      'commentId',
    ) as any;
  }

  async getComment(input: Parameters<CommentRepository['getComment']>[0]) {
    return memoryGet(memory.comments, (input as any).commentId) as any;
  }
}
