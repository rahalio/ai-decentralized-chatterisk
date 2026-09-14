import type { ExternalLinkRepository } from "@chatterisk/services/external-links";
import { memory, memoryGet, memoryList, memoryPut } from "../_shared/chatterisk-memory.js";

export class ExternalLinkRepositoryDdb implements ExternalLinkRepository {
  constructor(private readonly dynamoClient: any) {}
  async listExternalLinks(input: Parameters<ExternalLinkRepository['listExternalLinks']>[0]) {
    const projectId = (input as any)?.projectId;
    return memoryList(memory.links, (row) => !projectId || row.projectId === projectId) as any;
  }
  async createExternalLink(input: Parameters<ExternalLinkRepository['createExternalLink']>[0]) {
    return memoryPut(memory.links, 'lnk', { ...(input as object) }, 'linkId') as any;
  }
  async getExternalLink(input: Parameters<ExternalLinkRepository['getExternalLink']>[0]) {
    return memoryGet(memory.links, (input as any).linkId) as any;
  }
  async deleteExternalLink(input: Parameters<ExternalLinkRepository['deleteExternalLink']>[0]) {
    const id = (input as any).linkId;
    memory.links.delete(String(id));
    return { data: { linkId: id }, meta: { generatedAt: new Date().toISOString() } } as any;
  }
}
