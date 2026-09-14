import type { WatchRepository } from "@chatterisk/services/projects";
import { memory, memoryPatch } from "../_shared/chatterisk-memory.js";

export class WatchRepositoryDdb implements WatchRepository {
  constructor(private readonly dynamoClient: any) {}

  async addProjectToWatchlist(input: Parameters<WatchRepository['addProjectToWatchlist']>[0]) {
    return memoryPatch(memory.projects, String((input as any).projectId), { watched: true }) as any;
  }

  async removeProjectFromWatchlist(input: Parameters<WatchRepository['removeProjectFromWatchlist']>[0]) {
    return memoryPatch(memory.projects, String((input as any).projectId), { watched: false }) as any;
  }
}
