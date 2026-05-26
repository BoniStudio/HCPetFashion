import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost" | "glass";

const styles: Record<ButtonVariant, string> = {
  primary:
    "border border-ink bg-ink text-ivory-warm hover:bg-transparent hover:text-ink shadow-glow-sm hover:shadow-glow",
  outline:
    "border border-ink/80 text-ink hover:bg-ink hover:text-ivory-warm",
  ghost: "border border-transparent text-muted hover:text-ink",
  glass:
    "glass border-ink/10 text-ink hover:border-accent/40 hover:shadow-glow-sm",
};

type ButtonProps = {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
} & (
  | { href: string; external?: boolean; onClick?: never; type?: never }
  | { onClick?: () => void; type?: "button" | "submit"; href?: never; external?: never }
);

export function Button({
  variant = "outline",
  className,
  children,
  ...props
}: ButtonProps) {
  const base = cn(
    "inline-flex items-center justify-center px-8 py-3.5 font-display text-[10px] tracking-[0.22em] uppercase transition-all duration-300",
    styles[variant],
    className
  );

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={base}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      className={base}
    >
      {children}
    </button>
  );
}
