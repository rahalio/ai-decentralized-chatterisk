/**
 * External Links Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/external-links.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ExternalScanLink = components["schemas"]["ExternalScanLink"];
export type ExternalScanLinkCreate = components["schemas"]["ExternalScanLinkCreate"];
export type ExternalScanLinkListData = components["schemas"]["ExternalScanLinkListData"];
export type LinkId = components["schemas"]["LinkId"];
export type ExternalLink = operations["listExternalLinks"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateExternalLinkRequestInput = NonNullable<operations["createExternalLink"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListExternalLinksParams = NonNullable<operations["listExternalLinks"]["parameters"]["query"]>;
export type GetExternalLinkParams = operations["getExternalLink"]["parameters"]["path"];
export type DeleteExternalLinkParams = operations["deleteExternalLink"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListExternalLinksResponse = operations["listExternalLinks"]["responses"]["200"]["content"]["application/json"];
export type CreateExternalLinkResponse = operations["createExternalLink"]["responses"]["201"]["content"]["application/json"];
export type GetExternalLinkResponse = operations["getExternalLink"]["responses"]["200"]["content"]["application/json"];


