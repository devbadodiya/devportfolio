"use client";

import { profile } from "@/lib/content";
import { labelPath } from "@/lib/visits";
import { useSite } from "./chrome";

function project(lat: number, lng: number) {
  return {
    x: ((lng + 180) / 360) * 800,
    y: ((90 - lat) / 180) * 420,
  };
}

export function VisitsBoard() {
  const { visits, browserVisits } = useSite();
  const total = visits?.total ?? 0;
  const maxCountry = Math.max(1, ...(visits?.countries.map((item) => item.count) ?? [1]));
  const maxPage = Math.max(1, ...(visits?.pages.map((item) => item.count) ?? [1]));
  const base = project(profile.base.lat, profile.base.lng);
  const lines = [];
  for (let lng = -180; lng <= 180; lng += 30) {
    const x = ((lng + 180) / 360) * 800;
    lines.push(<line key={`v${lng}`} x1={x} y1={0} x2={x} y2={420} stroke="var(--grid)" strokeWidth="1" />);
  }
  for (let lat = -60; lat <= 60; lat += 30) {
    const y = ((90 - lat) / 180) * 420;
    lines.push(<line key={`h${lat}`} x1={0} y1={y} x2={800} y2={y} stroke="var(--grid)" strokeWidth="1" />);
  }

  return (
    <div className="map-layout">
      <div>
        <p className="stat-num">{total}</p>
        <p className="quiet">visits in the database</p>
        <div className="map-panel" style={{ marginTop: "1rem" }}>
          <svg viewBox="0 0 800 420" role="img" aria-label="Graticule with visitor pins">
            <rect width="800" height="420" fill="var(--sea)" />
            {lines}
            <circle cx={base.x} cy={base.y} r="16" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
            <rect x={base.x - 3.5} y={base.y - 3.5} width="7" height="7" fill="var(--accent)" />
            <text x={base.x + 14} y={base.y - 10} fill="var(--ink)" fontSize="13" fontFamily="ui-monospace, monospace">
              Base · MP
            </text>
            {visits?.pins.map((pin) => {
              const point = project(pin.lat, pin.lng);
              return (
                <g key={`${pin.city}-${pin.country}`}>
                  <circle cx={point.x} cy={point.y} r={6 + Math.min(pin.count, 6)} fill="var(--accent)" opacity="0.9" />
                  <text x={point.x + 10} y={point.y + 4} fill="var(--ink)" fontSize="12" fontFamily="ui-monospace, monospace">
                    {pin.city}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        <p className="quiet" style={{ marginTop: "0.7rem" }}>
          Square is home. Circles are cities this server has actually seen. No IP address is stored.
        </p>
      </div>
      <div>
        <p className="group-label">Fun facts</p>
        <ul className="hit-list">
          <li>
            <span>This browser</span>
            <span>{browserVisits || "—"}</span>
          </li>
          <li>
            <span>Countries</span>
            <span>{visits?.countries.length ?? 0}</span>
          </li>
          <li>
            <span>Cities pinned</span>
            <span>{visits?.pins.length ?? 0}</span>
          </li>
          <li>
            <span>Last place</span>
            <span>{visits?.last?.city || visits?.last?.country || "Unplaced"}</span>
          </li>
        </ul>
        <p className="group-label" style={{ marginTop: "1.4rem" }}>
          Top countries
        </p>
        {(visits?.countries.length ? visits.countries : [{ name: "Waiting", count: 0 }]).map((item) => (
          <div className="bar" key={item.name}>
            <span>{item.name}</span>
            <span className="bar-track">
              <span style={{ width: `${(item.count / maxCountry) * 100}%` }} />
            </span>
            <span>{item.count}</span>
          </div>
        ))}
        <p className="group-label" style={{ marginTop: "1.4rem" }}>
          Top pages
        </p>
        {(visits?.pages.length ? visits.pages : [{ name: "/", count: 0 }]).map((item) => (
          <div className="bar" key={item.name}>
            <span>{labelPath(item.name)}</span>
            <span className="bar-track">
              <span style={{ width: `${(item.count / maxPage) * 100}%` }} />
            </span>
            <span>{item.count}</span>
          </div>
        ))}
        <p className="group-label" style={{ marginTop: "1.4rem" }}>
          Recent
        </p>
        <ul className="hit-list">
          {visits?.recent.length ? (
            visits.recent.map((hit) => (
              <li key={hit.at + hit.path}>
                <span>
                  {labelPath(hit.path)}
                  {hit.city ? ` · ${hit.city}` : ""}
                </span>
                <span>
                  {new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: profile.timezone }).format(
                    new Date(hit.at),
                  )}
                </span>
              </li>
            ))
          ) : (
            <li>
              <span>You are the first signal on this run.</span>
              <span>—</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
