import { describe, expect, it } from "vitest";

describe("Janice Zapier configuration", () => {
  it("has a valid protected Zapier Catch Hook URL configured", () => {
    const webhookUrl = process.env.ZAPIER_JANICE_WEBHOOK_URL;

    expect(webhookUrl).toBeTruthy();
    expect(() => new URL(webhookUrl!)).not.toThrow();

    const parsed = new URL(webhookUrl!);
    expect(parsed.protocol).toBe("https:");
    expect(parsed.hostname).toBe("hooks.zapier.com");
    expect(parsed.pathname).toContain("/hooks/catch/");
  });
});
