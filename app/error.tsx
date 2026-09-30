"use client";

import { useEffect } from "react";
import { TransitionLink } from "@/components/links";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <article className="page missing">
      <p className="kicker">Error</p>
      <h1>Something broke on this page.</h1>
      <p className="lede">You can try again, or head back home.</p>
      <p className="missing-links">
        <button type="button" className="theme-btn" onClick={reset}>
          Try again
        </button>
        <span className="slash">/</span>
        <TransitionLink href="/" className="text-link">
          Home
        </TransitionLink>
      </p>
    </article>
  );
}
