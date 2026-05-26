import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost";

const styles: Record<ButtonVariant, string> = {
  primary:
    "border border-charcoal bg-charcoal text-ivory hover:bg-transparent hover:text-charcoal",
  outline:
    "border border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory",
  ghost: "border border-transparent text-warm hover:text-charcoal",
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
    "inline-flex items-center justify-center px-8 py-3.5 text-[11px] tracking-[0.22em] uppercase transition-all duration-300",
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
