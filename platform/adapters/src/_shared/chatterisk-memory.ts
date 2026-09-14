import { ulid } from 'ulid';
import { nowIso, responseMeta } from './sandbox-store.js';

const NIA = 'Risk intelligence only; not investment advice.';

function id(prefix: string) {
  return `${prefix}_${ulid().toLowerCase()}`;
}

export const memory = {
  projects: new Map<string, Record<string, unknown>>(),
  comments: new Map<string, Record<string, unknown>>(),
  botRulings: new Map<string, Record<string, unknown>>(),
  aggregates: new Map<string, Record<string, unknown>>(),
  alerts: new Map<string, Record<string, unknown>>(),
  policies: new Map<string, Record<string, unknown>>(),
  dossiers: new Map<string, Record<string, unknown>>(),
  links: new Map<string, Record<string, unknown>>(),
};

let seeded = false;

export function seedChatteriskDemo() {
  if (seeded) return;
  seeded = true;
  const projectId = 'prj_01hzykx8j0m0w5n6p7q8r9s0t1';
  memory.projects.set(projectId, {
    projectId,
    name: 'Example Token',
    ticker: 'EXT',
    contractAddress: '0x0000000000000000000000000000000000000001',
    aliases: ['example'],
    watched: true,
    createdAt: nowIso(),
    updatedAt: nowIso(),
    disclaimer: NIA,
  });
  const commentId = id('cmt');
  memory.comments.set(commentId, {
    commentId,
    projectId,
    channel: 'telegram',
    text: 'Looks like coordinated shill volume — treat as risk intelligence.',
    textPurged: false,
    tanhScore: -0.42,
    positiveProbability: 0.18,
    negativeProbability: 0.72,
    botSuspect: true,
    coordinatedInauthentic: false,
    modelVersion: 'lstm-cnn-tanh-v1',
    createdAt: nowIso(),
    disclaimer: NIA,
  });
  const aggId = id('agg');
  memory.aggregates.set(aggId, {
    aggregateId: aggId,
    projectId,
    contractAddress: '0x0000000000000000000000000000000000000001',
    window: '7d',
    rawMeanScore: -0.2,
    adjustedScore: -0.31,
    volumeWeight: 0.64,
    sampleSize: 128,
    botDownweightedCount: 22,
    botExclusionVolume: 0.17,
    positiveProbability: 0.22,
    negativeProbability: 0.55,
    channelMix: { twitter: 40, telegram: 70, facebook: 10, other: 8 },
    thinSample: false,
    modelVersion: 'lstm-cnn-tanh-v1',
    computedAt: nowIso(),
    disclaimer: NIA,
  });
  const alertId = id('alt');
  memory.alerts.set(alertId, {
    alertId,
    projectId,
    kind: 'score_drop',
    status: 'open',
    window: '7d',
    severity: 'high',
    triggeredAt: nowIso(),
    disclaimer: NIA,
  });
  const policyId = id('plc');
  memory.policies.set(policyId, {
    policyId,
    workspaceId: 'listing-desk',
    threshold: -0.35,
    window: '7d',
    niaLocked: true,
    createdAt: nowIso(),
    updatedAt: nowIso(),
  });
}

function envelope(data: unknown) {
  return { data, ...responseMeta() };
}

export function listEnvelope(items: unknown[]) {
  return { data: { items }, ...responseMeta() };
}

export function memoryList(table: Map<string, Record<string, unknown>>, filter?: (row: Record<string, unknown>) => boolean) {
  seedChatteriskDemo();
  const items = [...table.values()].filter((row) => (filter ? filter(row) : true));
  return listEnvelope(items);
}

export function memoryGet(table: Map<string, Record<string, unknown>>, key: string | undefined) {
  seedChatteriskDemo();
  if (!key) return envelope(null);
  return envelope(table.get(key) ?? null);
}

export function memoryPut(
  table: Map<string, Record<string, unknown>>,
  prefix: string,
  body: Record<string, unknown>,
  idField: string,
) {
  seedChatteriskDemo();
  const existing = typeof body[idField] === 'string' ? String(body[idField]) : id(prefix);
  const row = {
    ...body,
    [idField]: existing,
    createdAt: body.createdAt ?? nowIso(),
    updatedAt: nowIso(),
  };
  table.set(existing, row);
  return envelope(row);
}

export function memoryPatch(
  table: Map<string, Record<string, unknown>>,
  key: string,
  patch: Record<string, unknown>,
) {
  seedChatteriskDemo();
  const current = table.get(key) ?? { [Object.keys(patch)[0] ?? 'id']: key };
  const next = { ...current, ...patch, updatedAt: nowIso() };
  table.set(key, next);
  return envelope(next);
}

export { id as memoryId };
