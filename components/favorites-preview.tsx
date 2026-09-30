"use client";

import { useEffect, useRef, useState } from "react";
import { favorites } from "@/lib/content";

const PREVIEW_W = 264;
const PREVIEW_H = Math.round((10 / 16) * PREVIEW_W) + 24;
const GAP = 16;
const EDGE = 12;

export function FavoritesPreview() {
  const [active, setActive] = useState<string | null>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  function place(target: HTMLElement) {
    const label = target.querySelector("[data-fav-label]") ?? target;
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
      <div className="fav-list" id="favorites-list">
        {favorites.map((item) => (
          <a
            key={item.title}
            className="fav-row project-item"
            href={item.href}
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
            {item.logo ? (
              <img className="work-logo" src={item.logo} alt="" width={18} height={18} draggable={false} />
            ) : (
              <span className="mark" style={{ background: item.markColor || "#444" }}>
                {item.mark || item.title.slice(0, 1)}
              </span>
            )}
            <span data-fav-label="" className="item-name">
              {item.title}
            </span>
            <span className="slash">/</span>
            <span className="item-desc">{item.note}</span>
            <span className="item-url">{item.domain}</span>
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
            {favorites.map((item) => (
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
