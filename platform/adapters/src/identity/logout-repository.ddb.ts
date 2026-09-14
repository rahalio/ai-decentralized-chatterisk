import type { LogoutRepository } from "@chatterisk/services/identity";

export class LogoutRepositoryDdb implements LogoutRepository {
  constructor(private readonly dynamoClient: any) {}
  async operatorLogout(_input: Parameters<LogoutRepository['operatorLogout']>[0]) {
    return { data: { ok: true }, meta: { generatedAt: new Date().toISOString() } } as any;
  }
}
