import type { BotRulingRepository } from "@chatterisk/services/comments";
import { memory, memoryList, memoryPut } from "../_shared/chatterisk-memory.js";

export class BotRulingRepositoryDdb implements BotRulingRepository {
  constructor(private readonly dynamoClient: any) {}
  async applyCommentBotRuling(input: Parameters<BotRulingRepository['applyCommentBotRuling']>[0]) {
    return memoryPut(memory.botRulings, 'bot', { ...(input as object) }, 'rulingId') as any;
  }
  async listBotRulings(input: Parameters<BotRulingRepository['listBotRulings']>[0]) {
    const projectId = (input as any)?.projectId;
    return memoryList(memory.botRulings, (row) => !projectId || row.projectId === projectId) as any;
  }
}
