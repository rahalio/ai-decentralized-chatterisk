import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const registerRiskProject_Body = z
  .object({
    name: z.string().min(1).max(200),
    ticker: z.string().optional(),
    contractAddress: z.string().optional(),
    aliases: z.array(z.string()).optional(),
    watched: z.boolean().optional().default(true),
  })
  .passthrough();
const updateRiskProject_Body = z
  .object({
    name: z.string(),
    ticker: z.string(),
    contractAddress: z.string(),
    aliases: z.array(z.string()),
  })
  .partial()
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
const ProjectId = z.string();
const NiaDisclaimer = z.string();
const RiskProject = z
  .object({
    projectId: z.string().regex(/^prj_[0-9A-HJKMNP-TV-Z]{26}$/),
    name: z.string().min(1).max(200),
    ticker: z.string().max(32).optional(),
    contractAddress: z.string().optional(),
    aliases: z.array(z.string()).optional(),
    watched: z.boolean(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
    disclaimer: z
      .string()
      .optional()
      .default('Risk intelligence only; not investment advice.'),
  })
  .passthrough();
const RiskProjectListData = z
  .object({
    items: z.array(
      z
        .object({
          projectId: z.string().regex(/^prj_[0-9A-HJKMNP-TV-Z]{26}$/),
          name: z.string().min(1).max(200),
          ticker: z.string().max(32).optional(),
          contractAddress: z.string().optional(),
          aliases: z.array(z.string()).optional(),
          watched: z.boolean(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
          disclaimer: z
            .string()
            .optional()
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
const RiskProjectListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              projectId: z.string().regex(/^prj_[0-9A-HJKMNP-TV-Z]{26}$/),
              name: z.string().min(1).max(200),
              ticker: z.string().max(32).optional(),
              contractAddress: z.string().optional(),
              aliases: z.array(z.string()).optional(),
              watched: z.boolean(),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }),
              disclaimer: z
                .string()
                .optional()
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
const RiskProjectCreate = z
  .object({
    name: z.string().min(1).max(200),
    ticker: z.string().optional(),
    contractAddress: z.string().optional(),
    aliases: z.array(z.string()).optional(),
    watched: z.boolean().optional().default(true),
  })
  .passthrough();
const RiskProjectResponse = z
  .object({
    data: z
      .object({
        projectId: z.string().regex(/^prj_[0-9A-HJKMNP-TV-Z]{26}$/),
        name: z.string().min(1).max(200),
        ticker: z.string().max(32).optional(),
        contractAddress: z.string().optional(),
        aliases: z.array(z.string()).optional(),
        watched: z.boolean(),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }),
        disclaimer: z
          .string()
          .optional()
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
const RiskProjectUpdate = z
  .object({
    name: z.string(),
    ticker: z.string(),
    contractAddress: z.string(),
    aliases: z.array(z.string()),
  })
  .partial()
  .passthrough();

export const schemas: any = {
  registerRiskProject_Body,
  updateRiskProject_Body,
  Problem,
  ProjectId,
  NiaDisclaimer,
  RiskProject,
  RiskProjectListData,
  ResponseMeta,
  RiskProjectListResponse,
  RiskProjectCreate,
  RiskProjectResponse,
  RiskProjectUpdate,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/projects',
    alias: 'listRiskProjects',
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
      {
        name: 'watched',
        type: 'Query',
        schema: z.boolean().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  projectId: z.string().regex(/^prj_[0-9A-HJKMNP-TV-Z]{26}$/),
                  name: z.string().min(1).max(200),
                  ticker: z.string().max(32).optional(),
                  contractAddress: z.string().optional(),
                  aliases: z.array(z.string()).optional(),
                  watched: z.boolean(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }),
                  disclaimer: z
                    .string()
                    .optional()
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
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
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
  {
    method: 'post',
    path: '/v1/projects',
    alias: 'registerRiskProject',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: registerRiskProject_Body,
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
            projectId: z.string().regex(/^prj_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            ticker: z.string().max(32).optional(),
            contractAddress: z.string().optional(),
            aliases: z.array(z.string()).optional(),
            watched: z.boolean(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
            disclaimer: z
              .string()
              .optional()
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
        status: 400,
        description: `Malformed request`,
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
      {
        status: 401,
        description: `Missing or invalid API key`,
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
  {
    method: 'get',
    path: '/v1/projects/:projectId',
    alias: 'getRiskProject',
    requestFormat: 'json',
    parameters: [
      {
        name: 'projectId',
        type: 'Path',
        schema: z.string().regex(/^prj_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            projectId: z.string().regex(/^prj_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            ticker: z.string().max(32).optional(),
            contractAddress: z.string().optional(),
            aliases: z.array(z.string()).optional(),
            watched: z.boolean(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
            disclaimer: z
              .string()
              .optional()
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
        status: 401,
        description: `Missing or invalid API key`,
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
  {
    method: 'patch',
    path: '/v1/projects/:projectId',
    alias: 'updateRiskProject',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: updateRiskProject_Body,
      },
      {
        name: 'projectId',
        type: 'Path',
        schema: z.string().regex(/^prj_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            projectId: z.string().regex(/^prj_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            ticker: z.string().max(32).optional(),
            contractAddress: z.string().optional(),
            aliases: z.array(z.string()).optional(),
            watched: z.boolean(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
            disclaimer: z
              .string()
              .optional()
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
        status: 401,
        description: `Missing or invalid API key`,
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
  {
    method: 'post',
    path: '/v1/projects/:projectId/watch',
    alias: 'addProjectToWatchlist',
    requestFormat: 'json',
    parameters: [
      {
        name: 'projectId',
        type: 'Path',
        schema: z.string().regex(/^prj_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            projectId: z.string().regex(/^prj_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            ticker: z.string().max(32).optional(),
            contractAddress: z.string().optional(),
            aliases: z.array(z.string()).optional(),
            watched: z.boolean(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
            disclaimer: z
              .string()
              .optional()
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
  {
    method: 'delete',
    path: '/v1/projects/:projectId/watch',
    alias: 'removeProjectFromWatchlist',
    requestFormat: 'json',
    parameters: [
      {
        name: 'projectId',
        type: 'Path',
        schema: z.string().regex(/^prj_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            projectId: z.string().regex(/^prj_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            ticker: z.string().max(32).optional(),
            contractAddress: z.string().optional(),
            aliases: z.array(z.string()).optional(),
            watched: z.boolean(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
            disclaimer: z
              .string()
              .optional()
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
