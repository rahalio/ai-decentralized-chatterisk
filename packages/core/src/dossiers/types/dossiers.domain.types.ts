/**
 * Dossiers Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/dossiers.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type DossierExport = components["schemas"]["DossierExport"];
export type DossierExportCreate = components["schemas"]["DossierExportCreate"];
export type DossierExportListData = components["schemas"]["DossierExportListData"];
export type DossierId = components["schemas"]["DossierId"];
export type DossierStatus = components["schemas"]["DossierStatus"];
export type NiaDisclaimer = components["schemas"]["NiaDisclaimer"];
export type Dossier = operations["listDossiers"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateDossierRequestInput = NonNullable<operations["createDossier"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListDossiersParams = NonNullable<operations["listDossiers"]["parameters"]["query"]>;
export type GetDossierParams = operations["getDossier"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListDossiersResponse = operations["listDossiers"]["responses"]["200"]["content"]["application/json"];
export type CreateDossierResponse = operations["createDossier"]["responses"]["201"]["content"]["application/json"];
export type GetDossierResponse = operations["getDossier"]["responses"]["200"]["content"]["application/json"];


