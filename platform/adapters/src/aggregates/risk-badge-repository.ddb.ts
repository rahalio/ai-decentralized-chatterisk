import type { RiskBadgeRepository } from "@chatterisk/services/aggregates";
import { memory, seedChatteriskDemo } from "../_shared/chatterisk-memory.js";

export class RiskBadgeRepositoryDdb implements RiskBadgeRepository {
  constructor(private readonly dynamoClient: any) {}
  async getPartnerRiskBadge(input: Parameters<RiskBadgeRepository['getPartnerRiskBadge']>[0]) {
    seedChatteriskDemo();
    const addr = (input as any)?.contractAddress;
    const hit = [...memory.aggregates.values()].find((r) => r.contractAddress === addr);
    const score = Number(hit?.adjustedScore ?? 0);
    const thin = Boolean(hit?.thinSample);
    const state = !hit ? 'unknown' : thin ? 'insufficient_sample' : score < -0.3 ? 'high_risk' : 'stable';
    return {
      data: {
        projectId: hit?.projectId,
        contractAddress: addr,
        adjustedScore: hit?.adjustedScore,
        sampleSize: hit?.sampleSize ?? 0,
        thinSample: thin,
        state,
        externalScanLinked: memory.links.size > 0,
        disclaimer: 'Risk intelligence only; not investment advice.',
      },
      meta: { generatedAt: new Date().toISOString() },
    } as any;
  }
}
