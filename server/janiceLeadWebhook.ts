export type JaniceLeadRecord = {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  sourcePage: string;
  supportType: string | null;
  leadSummary: string | null;
  supportDetails: string | null;
  location: string | null;
  preferredStartTime: string | null;
  expectedDuration: string | null;
  preferredContactTime: string | null;
  relationshipToParticipant: string | null;
  ndisPlanStatus: string | null;
  conversationTranscript: string | null;
  createdAt: Date;
};

export type ZapierDeliveryResult =
  | { status: "delivered"; deliveredAt: Date }
  | { status: "failed"; error: string };

const ZAPIER_TIMEOUT_MS = 8_000;

export function buildJaniceZapierPayload(lead: JaniceLeadRecord) {
  return {
    event_type: "ausnew.janice_lead.captured",
    event_version: "1.0",
    event_id: `janice-${lead.id}`,
    captured_at: lead.createdAt.toISOString(),
    source: {
      channel: "Janice AI website chat",
      page_path: lead.sourcePage,
    },
    lead: {
      database_id: lead.id,
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      service_interest: lead.supportType,
      enquiry_summary: lead.leadSummary,
      support_details: lead.supportDetails,
      general_area: lead.location,
      preferred_start_time: lead.preferredStartTime,
      expected_duration: lead.expectedDuration,
      preferred_contact_time: lead.preferredContactTime,
      relationship_to_participant: lead.relationshipToParticipant,
      ndis_plan_status: lead.ndisPlanStatus,
    },
    conversation: {
      transcript: lead.conversationTranscript,
    },
  };
}

function safeErrorDetail(error: unknown) {
  if (error instanceof Error) return error.message.slice(0, 500);
  return "Unknown Zapier delivery error";
}

export async function deliverJaniceLeadToZapier(
  lead: JaniceLeadRecord,
  webhookUrl = process.env.ZAPIER_JANICE_WEBHOOK_URL,
  fetchImpl: typeof fetch = fetch
): Promise<ZapierDeliveryResult> {
  if (!webhookUrl) {
    return { status: "failed", error: "Zapier webhook is not configured" };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ZAPIER_TIMEOUT_MS);

  try {
    const response = await fetchImpl(webhookUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(buildJaniceZapierPayload(lead)),
      signal: controller.signal,
    });

    if (!response.ok) {
      return {
        status: "failed",
        error: `Zapier returned HTTP ${response.status}`,
      };
    }

    return { status: "delivered", deliveredAt: new Date() };
  } catch (error) {
    return { status: "failed", error: safeErrorDetail(error) };
  } finally {
    clearTimeout(timeout);
  }
}
