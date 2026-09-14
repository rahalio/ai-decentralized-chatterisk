import type { DossierRepository } from "@chatterisk/services/dossiers";
import { memory, memoryGet, memoryList, memoryPut } from "../_shared/chatterisk-memory.js";

export class DossierRepositoryDdb implements DossierRepository {
  constructor(private readonly dynamoClient: any) {}
  async listDossiers(_input: Parameters<DossierRepository['listDossiers']>[0]) {
    return memoryList(memory.dossiers) as any;
  }
  async createDossier(input: Parameters<DossierRepository['createDossier']>[0]) {
    return memoryPut(
      memory.dossiers,
      'dos',
      {
        ...(input as object),
        status: 'ready',
        modelVersion: 'lstm-cnn-tanh-v1',
        niaWatermark: true,
        contentHash: 'sha256:demo',
        downloadUrl: 'https://api.chatterisk.local/v1/dossiers/demo.pdf',
        disclaimer: 'Risk intelligence only; not investment advice.',
      },
      'dossierId',
    ) as any;
  }
  async getDossier(input: Parameters<DossierRepository['getDossier']>[0]) {
    return memoryGet(memory.dossiers, (input as any).dossierId) as any;
  }
}
