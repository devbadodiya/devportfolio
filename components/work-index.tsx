"use client";

import { useMemo, useState } from "react";
import { projects, type ProjectKind } from "@/lib/content";
import { TransitionLink } from "./links";

const filters: Array<"All" | ProjectKind> = ["All", "Product", "Learning", "Web"];

export function WorkIndex() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((project) => project.kind === filter)),
    [filter],
  );

  return (
    <>
      <div className="filters" role="tablist" aria-label="Filter projects">
        {filters.map((item) => (
          <button key={item} className="filter" type="button" data-on={item === filter ? "true" : "false"} onClick={() => setFilter(item)}>
            {item}
          </button>
        ))}
      </div>
      <div>
        {visible.map((project) => (
          <TransitionLink key={project.slug} href={`/work/${project.slug}`} className="work-row">
            <span className="idx">{project.kind}</span>
            <span>
              <strong>{project.title}</strong>
              <small>{project.summary}</small>
            </span>
            <span className="year">{project.year}</span>
          </TransitionLink>
        ))}
      </div>
    </>
  );
}
