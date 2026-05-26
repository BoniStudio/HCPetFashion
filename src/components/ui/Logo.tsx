"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
  href?: string;
};

const sizes = {
  sm: { icon: 28, text: "text-[9px] tracking-[0.28em]" },
  md: { icon: 36, text: "text-[10px] tracking-[0.32em]" },
  lg: { icon: 48, text: "text-xs tracking-[0.35em]" },
};

export function Logo({
  className,
  showWordmark = true,
  size = "md",
  href = "/",
}: LogoProps) {
  const s = sizes[size];

  const content = (
    <motion.span
      className={cn("inline-flex items-center gap-3", className)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    >
      <span className="relative shrink-0 overflow-hidden rounded-full">
        <Image
          src="/brand/logo.png"
          alt="HC Pet Fashion"
          width={s.icon}
          height={s.icon}
          className="h-auto w-auto object-contain"
          priority
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
    </motion.span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex focus-visible:outline-none">
        {content}
      </Link>
    );
  }

  return content;
}
