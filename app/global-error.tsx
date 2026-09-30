"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif", padding: "2rem", background: "#23201c", color: "#f4f1eb" }}>
        <p style={{ letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.6, fontSize: "0.8rem" }}>Error</p>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 500 }}>Something broke.</h1>
        <p style={{ opacity: 0.7 }}>{error.message || "Unexpected failure."}</p>
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: "1rem",
            border: "1px solid currentColor",
            background: "transparent",
            color: "inherit",
            padding: "0.4rem 0.8rem",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
