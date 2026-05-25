import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-3xl font-light text-charcoal">404</p>
      <p className="mt-4 text-sm text-stone">This page could not be found.</p>
      <Link
        href="/"
        className="mt-8 text-[11px] tracking-[0.2em] text-warm uppercase hover:text-charcoal"
      >
        Return Home
      </Link>
    </div>
  );
}
