import { describe, expect, it, vi } from "vitest";
import {
  buildJaniceZapierPayload,
  deliverJaniceLeadToZapier,
  type JaniceLeadRecord,
} from "./janiceLeadWebhook";

const exampleLead: JaniceLeadRecord = {
  id: 42,
  name: "Alex",
  phone: "0400 123 456",
  email: null,
  sourcePage: "/accommodation-services",
  supportType: "SDA accommodation",
  leadSummary: "Alex is seeking SDA accommodation in Western Sydney, ideally starting within two months. They asked about ongoing availability and want a call after 4 pm.",
  supportDetails: "Needs accessible accommodation options and a discussion about suitable support arrangements.",
  location: "Western Sydney",
  preferredStartTime: "Within two months",
  expectedDuration: "Ongoing",
  preferredContactTime: "After 4 pm",
  relationshipToParticipant: "Participant",
  ndisPlanStatus: "Active NDIS plan",
  conversationTranscript: '[{"speaker":"Visitor","message":"I need SDA accommodation"}]',
  createdAt: new Date("2026-09-19T02:00:00.000Z"),
};

describe("Janice CRM webhook payload", () => {
  it("includes the detailed phone-first lead handover required by AUSnew", () => {
    const payload = buildJaniceZapierPayload(exampleLead);

    expect(payload.event_type).toBe("ausnew.janice_lead.captured");
    expect(payload.source.channel).toBe("Janice AI website chat");
    expect(payload.lead.phone).toBe("0400 123 456");
    expect(payload.lead.email).toBeNull();
    expect(payload.lead.enquiry_summary).toContain("SDA accommodation");
    expect(payload.lead.preferred_start_time).toBe("Within two months");
    expect(payload.lead.expected_duration).toBe("Ongoing");
    expect(payload.lead.general_area).toBe("Western Sydney");
    expect(payload.conversation.transcript).toContain("I need SDA accommodation");
  });

  it("posts a JSON lead record to Zapier and marks successful delivery", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response("ok", { status: 200 }));

    const result = await deliverJaniceLeadToZapier(
      exampleLead,
      "https://hooks.zapier.com/hooks/catch/example/test/",
      fetchImpl
    );

    expect(result.status).toBe("delivered");
    expect(fetchImpl).toHaveBeenCalledOnce();
    const [url, options] = fetchImpl.mock.calls[0];
    expect(url).toContain("hooks.zapier.com");
    expect(options.method).toBe("POST");
    expect(JSON.parse(options.body).lead.phone).toBe("0400 123 456");
  });

  it("keeps the stored lead safe when Zapier reports an error", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response("unavailable", { status: 503 }));

    const result = await deliverJaniceLeadToZapier(
      exampleLead,
      "https://hooks.zapier.com/hooks/catch/example/test/",
      fetchImpl
    );

    expect(result).toEqual({ status: "failed", error: "Zapier returned HTTP 503" });
  });
});
