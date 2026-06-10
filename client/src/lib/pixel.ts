/**
 * AUSnew Support Services — Meta Pixel Event Tracking Utility
 * Centralised fbq wrapper so all events are typed and consistent.
 * Pixel ID: 251234289100056
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function fbq(...args: unknown[]) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq(...args);
  }
}

// ── Standard Events ────────────────────────────────────────────────────────

/** Fire on every route change (already fires on initial load via index.html) */
export function trackPageView() {
  fbq("track", "PageView");
}

/** User views a specific service page */
export function trackViewContent(params: {
  content_name: string;
  content_category: string;
  content_ids?: string[];
}) {
  fbq("track", "ViewContent", params);
}

/** User initiates contact — clicks phone, email, or opens a form */
export function trackContact(method: string) {
  fbq("track", "Contact", { contact_method: method });
}

/** User submits any lead/enquiry form */
export function trackLead(params: {
  content_name: string;
  content_category: string;
  value?: number;
  currency?: string;
}) {
  fbq("track", "Lead", {
    currency: "AUD",
    value: 0,
    ...params,
  });
}

/** User clicks "Get Support Now" CTA */
export function trackInitiateCheckout(source: string) {
  fbq("track", "InitiateCheckout", { content_name: source });
}

/** User searches (e.g. blog search) */
export function trackSearch(query: string) {
  fbq("track", "Search", { search_string: query });
}

// ── Custom Events ──────────────────────────────────────────────────────────

/** User scrolls to a depth milestone (25%, 50%, 75%, 90%) */
export function trackScrollDepth(page: string, depth: number) {
  fbq("trackCustom", "ScrollDepth", { page, depth_percent: depth });
}

/** User opens the Janice AI chat */
export function trackChatOpen() {
  fbq("trackCustom", "ChatOpen", { chat_name: "Janice" });
}

/** User sends a message in the Janice chat */
export function trackChatMessage(messageCount: number) {
  fbq("trackCustom", "ChatMessage", { chat_name: "Janice", message_count: messageCount });
}

/** Janice captures a lead (name/phone/email collected) */
export function trackChatLeadCaptured() {
  fbq("track", "Lead", {
    content_name: "Janice Chat Lead",
    content_category: "Chat",
    currency: "AUD",
    value: 0,
  });
}

/** User clicks phone number anywhere on site */
export function trackPhoneClick(location: string) {
  fbq("track", "Contact", { contact_method: "phone", location });
  fbq("trackCustom", "PhoneClick", { location });
}

/** User clicks email address anywhere on site */
export function trackEmailClick(location: string) {
  fbq("track", "Contact", { contact_method: "email", location });
  fbq("trackCustom", "EmailClick", { location });
}

/** User clicks the floating Get Support Now button */
export function trackFloatingCTAClick() {
  fbq("trackCustom", "FloatingCTAClick", { button: "Get Support Now" });
}

/** User reads a blog article */
export function trackBlogRead(slug: string, title: string) {
  fbq("track", "ViewContent", {
    content_name: title,
    content_category: "Blog",
    content_ids: [slug],
  });
}

/** User clicks a blog CTA link */
export function trackBlogCTAClick(service: string) {
  fbq("trackCustom", "BlogCTAClick", { service });
}

/** User views accommodation carousel */
export function trackCarouselView() {
  fbq("trackCustom", "CarouselView", { content_name: "Accommodation Properties" });
}

/** User clicks Wufoo form embed (iframe interaction) */
export function trackFormView(formName: string) {
  fbq("trackCustom", "FormView", { form_name: formName });
}
