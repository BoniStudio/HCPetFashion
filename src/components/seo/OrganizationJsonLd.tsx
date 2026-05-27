import { SITE_URL } from "@/lib/site";

export function OrganizationJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HC Pet Fashion",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo.png`,
    description:
      "Curated pet rainwear, limited boutique pieces, and custom sizing inquiries for stylish companions.",
    sameAs: [
      "https://www.instagram.com/hcpetfashion/",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
