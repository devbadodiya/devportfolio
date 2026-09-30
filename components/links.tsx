"use client";

import { useRouter } from "next/navigation";
import type { CSSProperties, FocusEvent, MouseEvent, ReactNode } from "react";

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function goTo(router: { push: (href: string) => void }, href: string) {
  const navigate = () => router.push(href);
  const doc = document as Document & { startViewTransition?: (cb: () => void) => void };
  if (!reducedMotion() && typeof doc.startViewTransition === "function") {
    doc.startViewTransition(navigate);
  } else {
    navigate();
  }
}

export function TransitionLink({
  href,
  className,
  children,
  onClick,
  onMouseEnter,
  onFocus,
  style,
  ...rest
}: {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onFocus?: (event: FocusEvent<HTMLAnchorElement>) => void;
  style?: CSSProperties;
  "data-active"?: string;
  "aria-label"?: string;
}) {
  const router = useRouter();
  function handle(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    onClick?.();
    goTo(router, href);
  }
  return (
    <a href={href} className={className} onClick={handle} onMouseEnter={onMouseEnter} onFocus={onFocus} style={style} {...rest}>
      {children}
    </a>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  if (href.startsWith("http") || href.startsWith("mailto:")) {
    const external = href.startsWith("http");
    return (
      <a className="text-link" href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
        {children}
      </a>
    );
  }
  return (
    <TransitionLink href={href} className="text-link">
      {children}
    </TransitionLink>
  );
}
