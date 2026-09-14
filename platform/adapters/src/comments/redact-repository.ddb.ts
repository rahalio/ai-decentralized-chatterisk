import type { RedactRepository } from "@chatterisk/services/comments";
import { memory, memoryPatch } from "../_shared/chatterisk-memory.js";

export class RedactRepositoryDdb implements RedactRepository {
  constructor(private readonly dynamoClient: any) {}
  async redactCommentPii(input: Parameters<RedactRepository['redactCommentPii']>[0]) {
    return memoryPatch(memory.comments, String((input as any).commentId), {
      text: undefined,
      textPurged: true,
    }) as any;
  }
}
