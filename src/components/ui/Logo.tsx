"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
  href?: string;
};

/** Brand signature sizes — never hero-scale */
const sizes = {
  sm: { icon: 26, text: "text-[9px] tracking-[0.28em]" },
  md: { icon: 32, text: "text-[10px] tracking-[0.32em]" },
  lg: { icon: 36, text: "text-[10px] tracking-[0.32em]" },
};

export function Logo({
  className,
  showWordmark = true,
  size = "md",
  href = "/",
}: LogoProps) {
  const s = sizes[size];

  const content = (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 transition-opacity duration-300 hover:opacity-80 md:gap-3",
        className
      )}
    >
      <span className="relative shrink-0">
        <Image
          src="/brand/logo.png"
          alt="HC Pet Fashion"
          width={s.icon}
          height={s.icon}
          className="h-[26px] w-[26px] object-contain md:h-8 md:w-8 lg:h-9 lg:w-9"
          priority={size === "md"}
          unoptimized
        />
      </span>
      {showWordmark && (
        <span
          className={cn(
            "font-display font-medium uppercase text-ink",
            s.text
          )}
        >
          HC Pet Fashion
        </span>
      )}
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/40"
      >
        {content}
      </Link>
    );
  }

  return content;
}
