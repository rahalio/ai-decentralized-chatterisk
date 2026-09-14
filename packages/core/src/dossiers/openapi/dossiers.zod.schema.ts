import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createDossier_Body = z
  .object({
    projectId: z.string(),
    periodStart: z.string().datetime({ offset: true }),
    periodEnd: z.string().datetime({ offset: true }),
  })
  .passthrough();
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const DossierId = z.string();
const DossierStatus = z.enum(['pending', 'ready', 'failed']);
const NiaDisclaimer = z.string();
const DossierExport = z
  .object({
    dossierId: z.string().regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
    projectId: z.string(),
    periodStart: z.string().datetime({ offset: true }),
    periodEnd: z.string().datetime({ offset: true }),
    status: z.enum(['pending', 'ready', 'failed']),
    modelVersion: z.string().optional(),
    contentHash: z.string().optional(),
    niaWatermark: z.boolean().optional().default(true),
    downloadUrl: z.string().url().optional(),
    createdAt: z.string().datetime({ offset: true }).optional(),
    disclaimer: z
      .string()
      .default('Risk intelligence only; not investment advice.'),
  })
  .passthrough();
const DossierExportListData = z
  .object({
    items: z.array(
      z
        .object({
          dossierId: z.string().regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
          projectId: z.string(),
          periodStart: z.string().datetime({ offset: true }),
          periodEnd: z.string().datetime({ offset: true }),
          status: z.enum(['pending', 'ready', 'failed']),
          modelVersion: z.string().optional(),
          contentHash: z.string().optional(),
          niaWatermark: z.boolean().optional().default(true),
          downloadUrl: z.string().url().optional(),
          createdAt: z.string().datetime({ offset: true }).optional(),
          disclaimer: z
            .string()
            .default('Risk intelligence only; not investment advice.'),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const DossierExportListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              dossierId: z.string().regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
              projectId: z.string(),
              periodStart: z.string().datetime({ offset: true }),
              periodEnd: z.string().datetime({ offset: true }),
              status: z.enum(['pending', 'ready', 'failed']),
              modelVersion: z.string().optional(),
              contentHash: z.string().optional(),
              niaWatermark: z.boolean().optional().default(true),
              downloadUrl: z.string().url().optional(),
              createdAt: z.string().datetime({ offset: true }).optional(),
              disclaimer: z
                .string()
                .default('Risk intelligence only; not investment advice.'),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const DossierExportCreate = z
  .object({
    projectId: z.string(),
    periodStart: z.string().datetime({ offset: true }),
    periodEnd: z.string().datetime({ offset: true }),
  })
  .passthrough();
const DossierExportResponse = z
  .object({
    data: z
      .object({
        dossierId: z.string().regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
        projectId: z.string(),
        periodStart: z.string().datetime({ offset: true }),
        periodEnd: z.string().datetime({ offset: true }),
        status: z.enum(['pending', 'ready', 'failed']),
        modelVersion: z.string().optional(),
        contentHash: z.string().optional(),
        niaWatermark: z.boolean().optional().default(true),
        downloadUrl: z.string().url().optional(),
        createdAt: z.string().datetime({ offset: true }).optional(),
        disclaimer: z
          .string()
          .default('Risk intelligence only; not investment advice.'),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();

export const schemas: any = {
  createDossier_Body,
  Problem,
  DossierId,
  DossierStatus,
  NiaDisclaimer,
  DossierExport,
  DossierExportListData,
  ResponseMeta,
  DossierExportListResponse,
  DossierExportCreate,
  DossierExportResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/dossiers',
    alias: 'listDossiers',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(100).optional().default(25),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  dossierId: z.string().regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
                  projectId: z.string(),
                  periodStart: z.string().datetime({ offset: true }),
                  periodEnd: z.string().datetime({ offset: true }),
                  status: z.enum(['pending', 'ready', 'failed']),
                  modelVersion: z.string().optional(),
                  contentHash: z.string().optional(),
                  niaWatermark: z.boolean().optional().default(true),
                  downloadUrl: z.string().url().optional(),
                  createdAt: z.string().datetime({ offset: true }).optional(),
                  disclaimer: z
                    .string()
                    .default('Risk intelligence only; not investment advice.'),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
  },
  {
    method: 'post',
    path: '/v1/dossiers',
    alias: 'createDossier',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createDossier_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            dossierId: z.string().regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
            projectId: z.string(),
            periodStart: z.string().datetime({ offset: true }),
            periodEnd: z.string().datetime({ offset: true }),
            status: z.enum(['pending', 'ready', 'failed']),
            modelVersion: z.string().optional(),
            contentHash: z.string().optional(),
            niaWatermark: z.boolean().optional().default(true),
            downloadUrl: z.string().url().optional(),
            createdAt: z.string().datetime({ offset: true }).optional(),
            disclaimer: z
              .string()
              .default('Risk intelligence only; not investment advice.'),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
  },
  {
    method: 'get',
    path: '/v1/dossiers/:dossierId',
    alias: 'getDossier',
    requestFormat: 'json',
    parameters: [
      {
        name: 'dossierId',
        type: 'Path',
        schema: z.string().regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            dossierId: z.string().regex(/^dos_[0-9A-HJKMNP-TV-Z]{26}$/),
            projectId: z.string(),
            periodStart: z.string().datetime({ offset: true }),
            periodEnd: z.string().datetime({ offset: true }),
            status: z.enum(['pending', 'ready', 'failed']),
            modelVersion: z.string().optional(),
            contentHash: z.string().optional(),
            niaWatermark: z.boolean().optional().default(true),
            downloadUrl: z.string().url().optional(),
            createdAt: z.string().datetime({ offset: true }).optional(),
            disclaimer: z
              .string()
              .default('Risk intelligence only; not investment advice.'),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
