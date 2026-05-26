import type { Metadata } from "next";
import { ContactPageClient } from "./ContactPageClient";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "For sizing, custom requests, availability, or order questions, email us directly or message us on Instagram.",
};

export default function ContactPage() {
  return (
    <>
      <a href={`mailto:${CONTACT_EMAIL}`} className="sr-only">
        {CONTACT_EMAIL}
      </a>
      <ContactPageClient />
    </>
  );
}
