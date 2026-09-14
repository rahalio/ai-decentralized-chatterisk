/**
 * Alerts Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/alerts.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AlertId = components["schemas"]["AlertId"];
export type AlertKind = components["schemas"]["AlertKind"];
export type AlertPolicy = components["schemas"]["AlertPolicy"];
export type AlertPolicyCreate = components["schemas"]["AlertPolicyCreate"];
export type AlertPolicyListData = components["schemas"]["AlertPolicyListData"];
export type AlertStatus = components["schemas"]["AlertStatus"];
export type PolicyId = components["schemas"]["PolicyId"];
export type RiskAlert = components["schemas"]["RiskAlert"];
export type RiskAlertListData = components["schemas"]["RiskAlertListData"];
export type AlertSnoozeRequest = components["schemas"]["AlertSnoozeRequest"];
export type Alert = operations["listRiskAlerts"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type SnoozeAlertRequestInput = NonNullable<operations["snoozeAlert"]["requestBody"]>["content"]["application/json"];
export type CreateAlertPolicyRequestInput = NonNullable<operations["createAlertPolicy"]["requestBody"]>["content"]["application/json"];
export type UpdateAlertPolicyRequestInput = NonNullable<operations["updateAlertPolicy"]["requestBody"]>["content"]["application/json"];
export type UpdateAlertPolicyRequest = UpdateAlertPolicyRequestInput;


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListRiskAlertsParams = NonNullable<operations["listRiskAlerts"]["parameters"]["query"]>;
export type AcknowledgeAlertParams = operations["acknowledgeAlert"]["parameters"]["path"];
export type SnoozeAlertParams = operations["snoozeAlert"]["parameters"]["path"];
export type GetAlertPolicyParams = operations["getAlertPolicy"]["parameters"]["path"];
export type UpdateAlertPolicyParams = operations["updateAlertPolicy"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListRiskAlertsResponse = operations["listRiskAlerts"]["responses"]["200"]["content"]["application/json"];
export type AcknowledgeAlertResponse = operations["acknowledgeAlert"]["responses"]["200"]["content"]["application/json"];
export type SnoozeAlertResponse = operations["snoozeAlert"]["responses"]["200"]["content"]["application/json"];
export type ListAlertPoliciesResponse = operations["listAlertPolicies"]["responses"]["200"]["content"]["application/json"];
export type CreateAlertPolicyResponse = operations["createAlertPolicy"]["responses"]["201"]["content"]["application/json"];
export type GetAlertPolicyResponse = operations["getAlertPolicy"]["responses"]["200"]["content"]["application/json"];
export type UpdateAlertPolicyResponse = operations["updateAlertPolicy"]["responses"]["200"]["content"]["application/json"];


