/**
 * Projects Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/projects.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type NiaDisclaimer = components["schemas"]["NiaDisclaimer"];
export type ProjectId = components["schemas"]["ProjectId"];
export type RiskProject = components["schemas"]["RiskProject"];
export type RiskProjectCreate = components["schemas"]["RiskProjectCreate"];
export type RiskProjectListData = components["schemas"]["RiskProjectListData"];
export type RiskProjectUpdate = components["schemas"]["RiskProjectUpdate"];
export type Project = operations["listRiskProjects"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RegisterRiskProjectRequestInput = NonNullable<operations["registerRiskProject"]["requestBody"]>["content"]["application/json"];
export type UpdateRiskProjectRequestInput = NonNullable<operations["updateRiskProject"]["requestBody"]>["content"]["application/json"];
export type UpdateRiskProjectRequest = UpdateRiskProjectRequestInput;


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListRiskProjectsParams = NonNullable<operations["listRiskProjects"]["parameters"]["query"]>;
export type GetRiskProjectParams = operations["getRiskProject"]["parameters"]["path"];
export type UpdateRiskProjectParams = operations["updateRiskProject"]["parameters"]["path"];
export type AddProjectToWatchlistParams = operations["addProjectToWatchlist"]["parameters"]["path"];
export type RemoveProjectFromWatchlistParams = operations["removeProjectFromWatchlist"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListRiskProjectsResponse = operations["listRiskProjects"]["responses"]["200"]["content"]["application/json"];
export type RegisterRiskProjectResponse = operations["registerRiskProject"]["responses"]["201"]["content"]["application/json"];
export type GetRiskProjectResponse = operations["getRiskProject"]["responses"]["200"]["content"]["application/json"];
export type UpdateRiskProjectResponse = operations["updateRiskProject"]["responses"]["200"]["content"]["application/json"];
export type AddProjectToWatchlistResponse = operations["addProjectToWatchlist"]["responses"]["200"]["content"]["application/json"];
export type RemoveProjectFromWatchlistResponse = operations["removeProjectFromWatchlist"]["responses"]["200"]["content"]["application/json"];


