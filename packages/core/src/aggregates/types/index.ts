/**
 * Aggregates Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/aggregates.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AggregateId = components["schemas"]["AggregateId"];
export type ChannelMix = components["schemas"]["ChannelMix"];
export type NiaDisclaimer = components["schemas"]["NiaDisclaimer"];
export type PartnerRiskBadge = components["schemas"]["PartnerRiskBadge"];
export type ProjectAggregate = components["schemas"]["ProjectAggregate"];
export type ProjectAggregateListData = components["schemas"]["ProjectAggregateListData"];
export type ScoreWindow = components["schemas"]["ScoreWindow"];
export type Aggregate = operations["listProjectAggregates"]["responses"]["200"]["content"]["application/json"]["data"];



// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListProjectAggregatesParams = NonNullable<operations["listProjectAggregates"]["parameters"]["query"]>;
export type GetLatestAggregateParams = NonNullable<operations["getLatestAggregate"]["parameters"]["query"]>;
export type GetPartnerRiskBadgeParams = NonNullable<operations["getPartnerRiskBadge"]["parameters"]["query"]>;


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListProjectAggregatesResponse = operations["listProjectAggregates"]["responses"]["200"]["content"]["application/json"];
export type GetLatestAggregateResponse = operations["getLatestAggregate"]["responses"]["200"]["content"]["application/json"];
export type GetPartnerRiskBadgeResponse = operations["getPartnerRiskBadge"]["responses"]["200"]["content"]["application/json"];


