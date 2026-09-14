import type { ProjectRepository } from "@chatterisk/services/projects";
import {
  memory,
  memoryGet,
  memoryList,
  memoryPatch,
  memoryPut,
} from "../_shared/chatterisk-memory.js";

export class ProjectRepositoryDdb implements ProjectRepository {
  constructor(private readonly dynamoClient: any) {}

  async listRiskProjects(input: Parameters<ProjectRepository['listRiskProjects']>[0]) {
    const watched = (input as any)?.watched;
    return memoryList(memory.projects, (row) =>
      watched === undefined ? true : row.watched === (watched === true || watched === 'true'),
    ) as any;
  }

  async registerRiskProject(input: Parameters<ProjectRepository['registerRiskProject']>[0]) {
    return memoryPut(memory.projects, 'prj', { ...(input as object), watched: (input as any).watched ?? true }, 'projectId') as any;
  }

  async getRiskProject(input: Parameters<ProjectRepository['getRiskProject']>[0]) {
    return memoryGet(memory.projects, (input as any).projectId) as any;
  }

  async updateRiskProject(input: Parameters<ProjectRepository['updateRiskProject']>[0]) {
    return memoryPatch(memory.projects, String((input as any).projectId), { ...(input as object) }) as any;
  }
}
