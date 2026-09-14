import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const ingestComment_Body = z
  .object({
    channel: z.enum(['twitter', 'telegram', 'facebook', 'other']),
    text: z.string(),
    externalId: z.string().optional(),
    publishedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const applyCommentBotRuling_Body = z
  .object({
    kind: z.enum(['bot_suspect', 'coordinated_inauthentic', 'reverse']),
    note: z.string().optional(),
  })
  .passthrough();
const updateCommentRetentionPolicy_Body = z
  .object({
    rawCommentDays: z.number().int().gte(1),
    aggregateRetain: z.boolean(),
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
const CommentId = z.string();
const SocialChannel = z.enum(['twitter', 'telegram', 'facebook', 'other']);
const NiaDisclaimer = z.string();
const SocialComment = z
  .object({
    commentId: z.string().regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/),
    projectId: z.string(),
    channel: z.enum(['twitter', 'telegram', 'facebook', 'other']),
    text: z.string().optional(),
    textPurged: z.boolean(),
    tanhScore: z.number().gte(-1).lte(1).optional(),
    positiveProbability: z.number().gte(0).lte(1).optional(),
    negativeProbability: z.number().gte(0).lte(1).optional(),
    botSuspect: z.boolean(),
    coordinatedInauthentic: z.boolean().optional(),
    modelVersion: z.string().optional(),
    permalink: z.string().url().optional(),
    publishedAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }),
    disclaimer: z
      .string()
      .optional()
      .default('Risk intelligence only; not investment advice.'),
  })
  .passthrough();
const SocialCommentListData = z
  .object({
    items: z.array(
      z
        .object({
          commentId: z.string().regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/),
          projectId: z.string(),
          channel: z.enum(['twitter', 'telegram', 'facebook', 'other']),
          text: z.string().optional(),
          textPurged: z.boolean(),
          tanhScore: z.number().gte(-1).lte(1).optional(),
          positiveProbability: z.number().gte(0).lte(1).optional(),
          negativeProbability: z.number().gte(0).lte(1).optional(),
          botSuspect: z.boolean(),
          coordinatedInauthentic: z.boolean().optional(),
          modelVersion: z.string().optional(),
          permalink: z.string().url().optional(),
          publishedAt: z.string().datetime({ offset: true }).optional(),
          createdAt: z.string().datetime({ offset: true }),
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
const SocialCommentListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              commentId: z.string().regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/),
              projectId: z.string(),
              channel: z.enum(['twitter', 'telegram', 'facebook', 'other']),
              text: z.string().optional(),
              textPurged: z.boolean(),
              tanhScore: z.number().gte(-1).lte(1).optional(),
              positiveProbability: z.number().gte(0).lte(1).optional(),
              negativeProbability: z.number().gte(0).lte(1).optional(),
              botSuspect: z.boolean(),
              coordinatedInauthentic: z.boolean().optional(),
              modelVersion: z.string().optional(),
              permalink: z.string().url().optional(),
              publishedAt: z.string().datetime({ offset: true }).optional(),
              createdAt: z.string().datetime({ offset: true }),
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
const SocialCommentCreate = z
  .object({
    channel: z.enum(['twitter', 'telegram', 'facebook', 'other']),
    text: z.string(),
    externalId: z.string().optional(),
    publishedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const SocialCommentResponse = z
  .object({
    data: z
      .object({
        commentId: z.string().regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/),
        projectId: z.string(),
        channel: z.enum(['twitter', 'telegram', 'facebook', 'other']),
        text: z.string().optional(),
        textPurged: z.boolean(),
        tanhScore: z.number().gte(-1).lte(1).optional(),
        positiveProbability: z.number().gte(0).lte(1).optional(),
        negativeProbability: z.number().gte(0).lte(1).optional(),
        botSuspect: z.boolean(),
        coordinatedInauthentic: z.boolean().optional(),
        modelVersion: z.string().optional(),
        permalink: z.string().url().optional(),
        publishedAt: z.string().datetime({ offset: true }).optional(),
        createdAt: z.string().datetime({ offset: true }),
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
const BotRulingCreate = z
  .object({
    kind: z.enum(['bot_suspect', 'coordinated_inauthentic', 'reverse']),
    note: z.string().optional(),
  })
  .passthrough();
const BotRulingId = z.string();
const BotRuling = z
  .object({
    rulingId: z.string().regex(/^bot_[0-9A-HJKMNP-TV-Z]{26}$/),
    commentId: z.string().regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/),
    projectId: z.string().optional(),
    kind: z.enum(['bot_suspect', 'coordinated_inauthentic', 'reverse']),
    note: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const BotRulingResponse = z
  .object({
    data: z
      .object({
        rulingId: z.string().regex(/^bot_[0-9A-HJKMNP-TV-Z]{26}$/),
        commentId: z.string().regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/),
        projectId: z.string().optional(),
        kind: z.enum(['bot_suspect', 'coordinated_inauthentic', 'reverse']),
        note: z.string().optional(),
        createdAt: z.string().datetime({ offset: true }),
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
const BotRulingListData = z
  .object({
    items: z.array(
      z
        .object({
          rulingId: z.string().regex(/^bot_[0-9A-HJKMNP-TV-Z]{26}$/),
          commentId: z.string().regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/),
          projectId: z.string().optional(),
          kind: z.enum(['bot_suspect', 'coordinated_inauthentic', 'reverse']),
          note: z.string().optional(),
          createdAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const BotRulingListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              rulingId: z.string().regex(/^bot_[0-9A-HJKMNP-TV-Z]{26}$/),
              commentId: z.string().regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/),
              projectId: z.string().optional(),
              kind: z.enum([
                'bot_suspect',
                'coordinated_inauthentic',
                'reverse',
              ]),
              note: z.string().optional(),
              createdAt: z.string().datetime({ offset: true }),
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
const RetentionPolicy = z
  .object({
    rawCommentDays: z.number().int().gte(1),
    aggregateRetain: z.boolean(),
  })
  .passthrough();
const RetentionPolicyResponse = z
  .object({
    data: z
      .object({
        rawCommentDays: z.number().int().gte(1),
        aggregateRetain: z.boolean(),
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
const RetentionJobId = z.string();
const JobStatus = z.enum(['queued', 'running', 'done', 'failed']);
const RetentionJob = z
  .object({
    jobId: z.string().regex(/^rtn_[0-9A-HJKMNP-TV-Z]{26}$/),
    status: z.enum(['queued', 'running', 'done', 'failed']),
    purgedCount: z.number().int().optional(),
    createdAt: z.string().datetime({ offset: true }),
    completedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const RetentionJobResponse = z
  .object({
    data: z
      .object({
        jobId: z.string().regex(/^rtn_[0-9A-HJKMNP-TV-Z]{26}$/),
        status: z.enum(['queued', 'running', 'done', 'failed']),
        purgedCount: z.number().int().optional(),
        createdAt: z.string().datetime({ offset: true }),
        completedAt: z.string().datetime({ offset: true }).optional(),
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
  ingestComment_Body,
  applyCommentBotRuling_Body,
  updateCommentRetentionPolicy_Body,
  Problem,
  CommentId,
  SocialChannel,
  NiaDisclaimer,
  SocialComment,
  SocialCommentListData,
  ResponseMeta,
  SocialCommentListResponse,
  SocialCommentCreate,
  SocialCommentResponse,
  BotRulingCreate,
  BotRulingId,
  BotRuling,
  BotRulingResponse,
  BotRulingListData,
  BotRulingListResponse,
  RetentionPolicy,
  RetentionPolicyResponse,
  RetentionJobId,
  JobStatus,
  RetentionJob,
  RetentionJobResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/bot-rulings',
    alias: 'listBotRulings',
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
                  rulingId: z.string().regex(/^bot_[0-9A-HJKMNP-TV-Z]{26}$/),
                  commentId: z.string().regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  projectId: z.string().optional(),
                  kind: z.enum([
                    'bot_suspect',
                    'coordinated_inauthentic',
                    'reverse',
                  ]),
                  note: z.string().optional(),
                  createdAt: z.string().datetime({ offset: true }),
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
    method: 'get',
    path: '/v1/comments/:commentId',
    alias: 'getComment',
    requestFormat: 'json',
    parameters: [
      {
        name: 'commentId',
        type: 'Path',
        schema: z.string().regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            commentId: z.string().regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/),
            projectId: z.string(),
            channel: z.enum(['twitter', 'telegram', 'facebook', 'other']),
            text: z.string().optional(),
            textPurged: z.boolean(),
            tanhScore: z.number().gte(-1).lte(1).optional(),
            positiveProbability: z.number().gte(0).lte(1).optional(),
            negativeProbability: z.number().gte(0).lte(1).optional(),
            botSuspect: z.boolean(),
            coordinatedInauthentic: z.boolean().optional(),
            modelVersion: z.string().optional(),
            permalink: z.string().url().optional(),
            publishedAt: z.string().datetime({ offset: true }).optional(),
            createdAt: z.string().datetime({ offset: true }),
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
    path: '/v1/comments/:commentId/bot-ruling',
    alias: 'applyCommentBotRuling',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: applyCommentBotRuling_Body,
      },
      {
        name: 'commentId',
        type: 'Path',
        schema: z.string().regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            rulingId: z.string().regex(/^bot_[0-9A-HJKMNP-TV-Z]{26}$/),
            commentId: z.string().regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/),
            projectId: z.string().optional(),
            kind: z.enum(['bot_suspect', 'coordinated_inauthentic', 'reverse']),
            note: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
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
    path: '/v1/comments/:commentId/redact',
    alias: 'redactCommentPii',
    requestFormat: 'json',
    parameters: [
      {
        name: 'commentId',
        type: 'Path',
        schema: z.string().regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            commentId: z.string().regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/),
            projectId: z.string(),
            channel: z.enum(['twitter', 'telegram', 'facebook', 'other']),
            text: z.string().optional(),
            textPurged: z.boolean(),
            tanhScore: z.number().gte(-1).lte(1).optional(),
            positiveProbability: z.number().gte(0).lte(1).optional(),
            negativeProbability: z.number().gte(0).lte(1).optional(),
            botSuspect: z.boolean(),
            coordinatedInauthentic: z.boolean().optional(),
            modelVersion: z.string().optional(),
            permalink: z.string().url().optional(),
            publishedAt: z.string().datetime({ offset: true }).optional(),
            createdAt: z.string().datetime({ offset: true }),
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
    method: 'get',
    path: '/v1/comments/retention',
    alias: 'getCommentRetentionPolicy',
    requestFormat: 'json',
    response: z
      .object({
        data: z
          .object({
            rawCommentDays: z.number().int().gte(1),
            aggregateRetain: z.boolean(),
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
    method: 'put',
    path: '/v1/comments/retention',
    alias: 'updateCommentRetentionPolicy',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: updateCommentRetentionPolicy_Body,
      },
    ],
    response: z
      .object({
        data: z
          .object({
            rawCommentDays: z.number().int().gte(1),
            aggregateRetain: z.boolean(),
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
    path: '/v1/comments/retention/run',
    alias: 'runCommentRetentionJob',
    requestFormat: 'json',
    parameters: [
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
            jobId: z.string().regex(/^rtn_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum(['queued', 'running', 'done', 'failed']),
            purgedCount: z.number().int().optional(),
            createdAt: z.string().datetime({ offset: true }),
            completedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/projects/:projectId/comments',
    alias: 'listProjectComments',
    requestFormat: 'json',
    parameters: [
      {
        name: 'projectId',
        type: 'Path',
        schema: z.string(),
      },
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
                  commentId: z.string().regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  projectId: z.string(),
                  channel: z.enum(['twitter', 'telegram', 'facebook', 'other']),
                  text: z.string().optional(),
                  textPurged: z.boolean(),
                  tanhScore: z.number().gte(-1).lte(1).optional(),
                  positiveProbability: z.number().gte(0).lte(1).optional(),
                  negativeProbability: z.number().gte(0).lte(1).optional(),
                  botSuspect: z.boolean(),
                  coordinatedInauthentic: z.boolean().optional(),
                  modelVersion: z.string().optional(),
                  permalink: z.string().url().optional(),
                  publishedAt: z.string().datetime({ offset: true }).optional(),
                  createdAt: z.string().datetime({ offset: true }),
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
    path: '/v1/projects/:projectId/comments',
    alias: 'ingestComment',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: ingestComment_Body,
      },
      {
        name: 'projectId',
        type: 'Path',
        schema: z.string(),
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
            commentId: z.string().regex(/^cmt_[0-9A-HJKMNP-TV-Z]{26}$/),
            projectId: z.string(),
            channel: z.enum(['twitter', 'telegram', 'facebook', 'other']),
            text: z.string().optional(),
            textPurged: z.boolean(),
            tanhScore: z.number().gte(-1).lte(1).optional(),
            positiveProbability: z.number().gte(0).lte(1).optional(),
            negativeProbability: z.number().gte(0).lte(1).optional(),
            botSuspect: z.boolean(),
            coordinatedInauthentic: z.boolean().optional(),
            modelVersion: z.string().optional(),
            permalink: z.string().url().optional(),
            publishedAt: z.string().datetime({ offset: true }).optional(),
            createdAt: z.string().datetime({ offset: true }),
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
