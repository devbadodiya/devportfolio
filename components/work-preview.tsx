"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/content";

const PREVIEW_W = 264;
const PREVIEW_H = Math.round((10 / 16) * PREVIEW_W) + 24;
const GAP = 16;
const EDGE = 12;

type Item = {
  title: string;
  summary: string;
  accent: string;
  href: string;
  preview: string;
  logo: string;
};

const homeWork: Item[] = projects
  .filter((project) => project.slug === "cosverse")
  .map((project) => ({
    title: project.title,
    summary: project.summary,
    accent: project.accent,
    href: "https://chat.cosverse.ai",
    preview: "/previews/cosverse.png",
    logo: "/logos/cosverse.png",
  }));

export function WorkPreview() {
  const [active, setActive] = useState<string | null>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  function place(target: HTMLElement) {
    const label = target.querySelector("[data-project-label]") ?? target;
    const rect = label.getBoundingClientRect();
    const width = cardRef.current?.offsetWidth || PREVIEW_W;
    const height = cardRef.current?.offsetHeight || PREVIEW_H;
    const column = target.closest(".column") ?? document.querySelector(".column");
    const columnLeft = column?.getBoundingClientRect().left ?? 0;
    let left = columnLeft - GAP - width;
    let top = rect.top + rect.height / 2 - height / 2;

    if (left >= EDGE) {
      top = Math.max(EDGE, Math.min(top, window.innerHeight - height - EDGE));
      setPos({ top, left });
      return;
    }

    left = Math.max(EDGE, Math.min(rect.left + rect.width / 2 - width / 2, window.innerWidth - width - EDGE));
    top = Math.min(rect.bottom + 10, window.innerHeight - height - EDGE);
    setPos({ top, left });
  }

  return (
    <>
      <div id="project-list">
        {homeWork.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="item project-item"
            data-project=""
            target="_blank"
            rel="noopener noreferrer"
            onPointerEnter={(event) => {
              place(event.currentTarget);
              setActive(item.preview);
            }}
            onPointerLeave={() => setActive(null)}
            onFocus={(event) => {
              place(event.currentTarget);
              setActive(item.preview);
            }}
            onBlur={() => setActive(null)}
          >
            <img className="work-logo" src={item.logo} alt="" width={18} height={18} draggable={false} />
            <span data-project-label="" className="item-name">
              {item.title}
              <svg className="ext" viewBox="0 0 12 12" aria-hidden="true">
                <path
                  d="M3 9L9 3M5 3h4v4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="slash">/</span>
            <span className="item-desc">{item.summary}</span>
          </a>
        ))}
      </div>

      <div
        className="project-preview"
        aria-hidden="true"
        style={
          pos
            ? { transform: `translate3d(${pos.left}px, ${pos.top}px, 0)`, opacity: active ? 1 : 0 }
            : { opacity: 0 }
        }
      >
        <div
          ref={cardRef}
          className={`preview-card${active ? " is-on" : ""}${reduced.current ? " no-motion" : ""}`}
        >
          <div className="preview-frame">
            {homeWork.map((item) => (
              <img
                key={item.preview}
                src={item.preview}
                alt=""
                loading="eager"
                draggable={false}
                className="preview-shot"
                style={{ opacity: active === item.preview ? 1 : 0 }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
