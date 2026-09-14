import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const snoozeAlert_Body = z
  .object({
    until: z.string().datetime({ offset: true }),
    note: z.string().optional(),
  })
  .passthrough();
const createAlertPolicy_Body = z
  .object({
    workspaceId: z.string(),
    threshold: z.number(),
    window: z.string().optional().default('7d'),
    routing: z.string().optional(),
  })
  .passthrough();
const AlertStatus = z.enum(['open', 'acknowledged', 'snoozed', 'closed']);
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
const AlertId = z.string();
const AlertKind = z.enum(['score_drop', 'high_negativity', 'bot_surge']);
const RiskAlert = z
  .object({
    alertId: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
    projectId: z.string(),
    kind: z.enum(['score_drop', 'high_negativity', 'bot_surge']),
    status: z.enum(['open', 'acknowledged', 'snoozed', 'closed']),
    window: z.string().optional(),
    severity: z.enum(['low', 'medium', 'high']).optional(),
    triggeredAt: z.string().datetime({ offset: true }),
    acknowledgedAt: z.string().datetime({ offset: true }).optional(),
    snoozedUntil: z.string().datetime({ offset: true }).optional(),
    disclaimer: z
      .string()
      .optional()
      .default('Risk intelligence only; not investment advice.'),
  })
  .passthrough();
const RiskAlertListData = z
  .object({
    items: z.array(
      z
        .object({
          alertId: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
          projectId: z.string(),
          kind: z.enum(['score_drop', 'high_negativity', 'bot_surge']),
          status: z.enum(['open', 'acknowledged', 'snoozed', 'closed']),
          window: z.string().optional(),
          severity: z.enum(['low', 'medium', 'high']).optional(),
          triggeredAt: z.string().datetime({ offset: true }),
          acknowledgedAt: z.string().datetime({ offset: true }).optional(),
          snoozedUntil: z.string().datetime({ offset: true }).optional(),
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
const RiskAlertListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              alertId: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
              projectId: z.string(),
              kind: z.enum(['score_drop', 'high_negativity', 'bot_surge']),
              status: z.enum(['open', 'acknowledged', 'snoozed', 'closed']),
              window: z.string().optional(),
              severity: z.enum(['low', 'medium', 'high']).optional(),
              triggeredAt: z.string().datetime({ offset: true }),
              acknowledgedAt: z.string().datetime({ offset: true }).optional(),
              snoozedUntil: z.string().datetime({ offset: true }).optional(),
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
const RiskAlertResponse = z
  .object({
    data: z
      .object({
        alertId: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
        projectId: z.string(),
        kind: z.enum(['score_drop', 'high_negativity', 'bot_surge']),
        status: z.enum(['open', 'acknowledged', 'snoozed', 'closed']),
        window: z.string().optional(),
        severity: z.enum(['low', 'medium', 'high']).optional(),
        triggeredAt: z.string().datetime({ offset: true }),
        acknowledgedAt: z.string().datetime({ offset: true }).optional(),
        snoozedUntil: z.string().datetime({ offset: true }).optional(),
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
const AlertSnoozeRequest = z
  .object({
    until: z.string().datetime({ offset: true }),
    note: z.string().optional(),
  })
  .passthrough();
const PolicyId = z.string();
const AlertPolicy = z
  .object({
    policyId: z.string().regex(/^plc_[0-9A-HJKMNP-TV-Z]{26}$/),
    workspaceId: z.string(),
    threshold: z.number(),
    window: z.string().optional().default('7d'),
    routing: z.string().optional(),
    niaLocked: z.boolean().optional().default(true),
    createdAt: z.string().datetime({ offset: true }).optional(),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const AlertPolicyListData = z
  .object({
    items: z.array(
      z
        .object({
          policyId: z.string().regex(/^plc_[0-9A-HJKMNP-TV-Z]{26}$/),
          workspaceId: z.string(),
          threshold: z.number(),
          window: z.string().optional().default('7d'),
          routing: z.string().optional(),
          niaLocked: z.boolean().optional().default(true),
          createdAt: z.string().datetime({ offset: true }).optional(),
          updatedAt: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
  })
  .passthrough();
const AlertPolicyListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              policyId: z.string().regex(/^plc_[0-9A-HJKMNP-TV-Z]{26}$/),
              workspaceId: z.string(),
              threshold: z.number(),
              window: z.string().optional().default('7d'),
              routing: z.string().optional(),
              niaLocked: z.boolean().optional().default(true),
              createdAt: z.string().datetime({ offset: true }).optional(),
              updatedAt: z.string().datetime({ offset: true }).optional(),
            })
            .passthrough()
        ),
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
const AlertPolicyCreate = z
  .object({
    workspaceId: z.string(),
    threshold: z.number(),
    window: z.string().optional().default('7d'),
    routing: z.string().optional(),
  })
  .passthrough();
const AlertPolicyResponse = z
  .object({
    data: z
      .object({
        policyId: z.string().regex(/^plc_[0-9A-HJKMNP-TV-Z]{26}$/),
        workspaceId: z.string(),
        threshold: z.number(),
        window: z.string().optional().default('7d'),
        routing: z.string().optional(),
        niaLocked: z.boolean().optional().default(true),
        createdAt: z.string().datetime({ offset: true }).optional(),
        updatedAt: z.string().datetime({ offset: true }).optional(),
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
  snoozeAlert_Body,
  createAlertPolicy_Body,
  AlertStatus,
  Problem,
  AlertId,
  AlertKind,
  RiskAlert,
  RiskAlertListData,
  ResponseMeta,
  RiskAlertListResponse,
  RiskAlertResponse,
  AlertSnoozeRequest,
  PolicyId,
  AlertPolicy,
  AlertPolicyListData,
  AlertPolicyListResponse,
  AlertPolicyCreate,
  AlertPolicyResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/alert-policies',
    alias: 'listAlertPolicies',
    requestFormat: 'json',
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  policyId: z.string().regex(/^plc_[0-9A-HJKMNP-TV-Z]{26}$/),
                  workspaceId: z.string(),
                  threshold: z.number(),
                  window: z.string().optional().default('7d'),
                  routing: z.string().optional(),
                  niaLocked: z.boolean().optional().default(true),
                  createdAt: z.string().datetime({ offset: true }).optional(),
                  updatedAt: z.string().datetime({ offset: true }).optional(),
                })
                .passthrough()
            ),
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
    path: '/v1/alert-policies',
    alias: 'createAlertPolicy',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createAlertPolicy_Body,
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
            policyId: z.string().regex(/^plc_[0-9A-HJKMNP-TV-Z]{26}$/),
            workspaceId: z.string(),
            threshold: z.number(),
            window: z.string().optional().default('7d'),
            routing: z.string().optional(),
            niaLocked: z.boolean().optional().default(true),
            createdAt: z.string().datetime({ offset: true }).optional(),
            updatedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/alert-policies/:policyId',
    alias: 'getAlertPolicy',
    requestFormat: 'json',
    parameters: [
      {
        name: 'policyId',
        type: 'Path',
        schema: z.string().regex(/^plc_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            policyId: z.string().regex(/^plc_[0-9A-HJKMNP-TV-Z]{26}$/),
            workspaceId: z.string(),
            threshold: z.number(),
            window: z.string().optional().default('7d'),
            routing: z.string().optional(),
            niaLocked: z.boolean().optional().default(true),
            createdAt: z.string().datetime({ offset: true }).optional(),
            updatedAt: z.string().datetime({ offset: true }).optional(),
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
    method: 'patch',
    path: '/v1/alert-policies/:policyId',
    alias: 'updateAlertPolicy',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createAlertPolicy_Body,
      },
      {
        name: 'policyId',
        type: 'Path',
        schema: z.string().regex(/^plc_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            policyId: z.string().regex(/^plc_[0-9A-HJKMNP-TV-Z]{26}$/),
            workspaceId: z.string(),
            threshold: z.number(),
            window: z.string().optional().default('7d'),
            routing: z.string().optional(),
            niaLocked: z.boolean().optional().default(true),
            createdAt: z.string().datetime({ offset: true }).optional(),
            updatedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/alerts',
    alias: 'listRiskAlerts',
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
        name: 'status',
        type: 'Query',
        schema: z
          .enum(['open', 'acknowledged', 'snoozed', 'closed'])
          .optional(),
      },
      {
        name: 'projectId',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  alertId: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  projectId: z.string(),
                  kind: z.enum(['score_drop', 'high_negativity', 'bot_surge']),
                  status: z.enum(['open', 'acknowledged', 'snoozed', 'closed']),
                  window: z.string().optional(),
                  severity: z.enum(['low', 'medium', 'high']).optional(),
                  triggeredAt: z.string().datetime({ offset: true }),
                  acknowledgedAt: z
                    .string()
                    .datetime({ offset: true })
                    .optional(),
                  snoozedUntil: z
                    .string()
                    .datetime({ offset: true })
                    .optional(),
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
  },
  {
    method: 'post',
    path: '/v1/alerts/:alertId/acknowledge',
    alias: 'acknowledgeAlert',
    requestFormat: 'json',
    parameters: [
      {
        name: 'alertId',
        type: 'Path',
        schema: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            alertId: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
            projectId: z.string(),
            kind: z.enum(['score_drop', 'high_negativity', 'bot_surge']),
            status: z.enum(['open', 'acknowledged', 'snoozed', 'closed']),
            window: z.string().optional(),
            severity: z.enum(['low', 'medium', 'high']).optional(),
            triggeredAt: z.string().datetime({ offset: true }),
            acknowledgedAt: z.string().datetime({ offset: true }).optional(),
            snoozedUntil: z.string().datetime({ offset: true }).optional(),
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
    method: 'post',
    path: '/v1/alerts/:alertId/snooze',
    alias: 'snoozeAlert',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: snoozeAlert_Body,
      },
      {
        name: 'alertId',
        type: 'Path',
        schema: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            alertId: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
            projectId: z.string(),
            kind: z.enum(['score_drop', 'high_negativity', 'bot_surge']),
            status: z.enum(['open', 'acknowledged', 'snoozed', 'closed']),
            window: z.string().optional(),
            severity: z.enum(['low', 'medium', 'high']).optional(),
            triggeredAt: z.string().datetime({ offset: true }),
            acknowledgedAt: z.string().datetime({ offset: true }).optional(),
            snoozedUntil: z.string().datetime({ offset: true }).optional(),
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
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
