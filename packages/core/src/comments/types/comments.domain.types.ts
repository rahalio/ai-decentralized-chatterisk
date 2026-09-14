/**
 * Comments Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/comments.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type BotRuling = components["schemas"]["BotRuling"];
export type BotRulingCreate = components["schemas"]["BotRulingCreate"];
export type BotRulingId = components["schemas"]["BotRulingId"];
export type BotRulingListData = components["schemas"]["BotRulingListData"];
export type CommentId = components["schemas"]["CommentId"];
export type NiaDisclaimer = components["schemas"]["NiaDisclaimer"];
export type RetentionJob = components["schemas"]["RetentionJob"];
export type RetentionJobId = components["schemas"]["RetentionJobId"];
export type RetentionPolicy = components["schemas"]["RetentionPolicy"];
export type SocialChannel = components["schemas"]["SocialChannel"];
export type SocialComment = components["schemas"]["SocialComment"];
export type SocialCommentCreate = components["schemas"]["SocialCommentCreate"];
export type SocialCommentListData = components["schemas"]["SocialCommentListData"];
export type Comment = operations["listProjectComments"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type IngestCommentRequestInput = NonNullable<operations["ingestComment"]["requestBody"]>["content"]["application/json"];
export type ApplyCommentBotRulingRequestInput = NonNullable<operations["applyCommentBotRuling"]["requestBody"]>["content"]["application/json"];
export type UpdateCommentRetentionPolicyRequestInput = NonNullable<operations["updateCommentRetentionPolicy"]["requestBody"]>["content"]["application/json"];
export type UpdateCommentRetentionPolicyRequest = UpdateCommentRetentionPolicyRequestInput;


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListProjectCommentsParams = NonNullable<operations["listProjectComments"]["parameters"]["query"]>;
export type IngestCommentParams = operations["ingestComment"]["parameters"]["path"];
export type GetCommentParams = operations["getComment"]["parameters"]["path"];
export type RedactCommentPiiParams = operations["redactCommentPii"]["parameters"]["path"];
export type ApplyCommentBotRulingParams = operations["applyCommentBotRuling"]["parameters"]["path"];
export type ListBotRulingsParams = NonNullable<operations["listBotRulings"]["parameters"]["query"]>;


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListProjectCommentsResponse = operations["listProjectComments"]["responses"]["200"]["content"]["application/json"];
export type IngestCommentResponse = operations["ingestComment"]["responses"]["201"]["content"]["application/json"];
export type GetCommentResponse = operations["getComment"]["responses"]["200"]["content"]["application/json"];
export type RedactCommentPiiResponse = operations["redactCommentPii"]["responses"]["200"]["content"]["application/json"];
export type ApplyCommentBotRulingResponse = operations["applyCommentBotRuling"]["responses"]["201"]["content"]["application/json"];
export type ListBotRulingsResponse = operations["listBotRulings"]["responses"]["200"]["content"]["application/json"];
export type GetCommentRetentionPolicyResponse = operations["getCommentRetentionPolicy"]["responses"]["200"]["content"]["application/json"];
export type UpdateCommentRetentionPolicyResponse = operations["updateCommentRetentionPolicy"]["responses"]["200"]["content"]["application/json"];
export type RunCommentRetentionJobResponse = operations["runCommentRetentionJob"]["responses"]["202"]["content"]["application/json"];


