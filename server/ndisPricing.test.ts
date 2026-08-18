import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

const pricingPagePath = new URL("../client/src/pages/NDISPricing.tsx", import.meta.url);

describe("NDIS Pricing page", () => {
  it("uses the verified 2026–27 national Level 1 support-worker amounts", async () => {
    const content = await readFile(pricingPagePath, "utf8");

    expect(content).toContain("2026–27 NDIS Pricing Schedule");
    expect(content).toContain('rate: "$73.58"');
    expect(content).toContain('rate: "$81.07"');
    expect(content).toContain('rate: "$82.57"');
    expect(content).toContain('rate: "$103.54"');
    expect(content).toContain('rate: "$133.50"');
    expect(content).toContain('rate: "$163.46"');
  });

  it("does not retain the superseded 2025–26 public pricing language or MTA amount", async () => {
    const content = await readFile(pricingPagePath, "utf8");

    expect(content).not.toContain("2025-26 NDIS Price Guide");
    expect(content).not.toContain("$725.24/day");
    expect(content).toContain("$162.85/day");
  });
});
