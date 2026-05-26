export const CONTACT_EMAIL = "hc.pet.fashion@outlook.com";

export const INSTAGRAM_URL =
  "https://www.instagram.com/hcpetfashion?igsh=NHZhY2x6ZnJmMHBv";

export const INSTAGRAM_HANDLE = "@hcpetfashion";

export const INSTAGRAM_QR = "/social/HCPet_Ins.png";

export const SHIPPING_ESTIMATE = 8;

export const FREE_SHIPPING_THRESHOLD = 75;

export const CONTACT_MAILTO_SUBJECT = "HC Pet Fashion Inquiry";

export function buildMailtoHref(subject: string, body?: string): string {
  const params = new URLSearchParams();
  params.set("subject", subject);
  if (body) params.set("body", body);
  return `mailto:${CONTACT_EMAIL}?${params.toString()}`;
}

export const CONTACT_MAILTO_HREF = buildMailtoHref(CONTACT_MAILTO_SUBJECT);

export function buildProductInquiryMailto(productName: string): string {
  return buildMailtoHref(`HC Pet Fashion Inquiry - ${productName}`);
}

export function buildOrderInquiryMailto(body: string): string {
  return buildMailtoHref("HC Pet Fashion Order Inquiry", body);
}
