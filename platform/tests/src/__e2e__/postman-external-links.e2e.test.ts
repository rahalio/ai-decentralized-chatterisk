/**
 * Postman-collection 1:1 Vitest tests for external-links (generated)
 *
 * One it() = one API request. Add sample data to vars for e2e runs.
 * Run: pnpm test:e2e or pnpm test:suite:db
 * Requires: API server at baseUrl (default http://localhost:3000)
 */

import { describe, it, expect } from "vitest";

const vars: Record<string, string> = {
  baseUrl: "http://localhost:3000",
  orgId: "test-org",
  accessToken: "",
  cursor: "",
  limit: "",
  linkId: "",
  projectId: "",
};

function sub(s: string): string {
  return s.replace(/\{\{([^}]+)\}\}/g, (_, k) => vars[k.trim()] ?? "");
}

describe("Postman / external-links (1:1 generated)", () => {

  it("listExternalLinks", async () => {
    const url = sub("{{baseUrl}}/v1/external-links?cursor={{cursor}}&limit={{limit}}&projectId={{projectId}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("createExternalLink", async () => {
    const url = sub("{{baseUrl}}/v1/external-links");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {}) },
      body: sub("{\n  \"projectId\": \"newman_projectId\",\n  \"contractAddress\": \"\",\n  \"externalScanId\": \"newman_externalScanId\",\n  \"provider\": \"\",\n  \"url\": \"https://example.com\"\n}"),
    });
    expect(res.status).toBe(201);
    const j = await res.json(); expect(j).toHaveProperty("data");
    if (j?.data?.id) vars['externalLinkId'] = j.data.id;
  });

  it("getExternalLink", async () => {
    const url = sub("{{baseUrl}}/v1/external-links/{{linkId}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("deleteExternalLink", async () => {
    const url = sub("{{baseUrl}}/v1/external-links/{{linkId}}");
    const res = await fetch(url, {
      method: "DELETE",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(204);
  });
});
