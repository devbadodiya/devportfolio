export function Seal() {
  return (
    <svg className="seal" viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <path id="seal-path" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
      </defs>
      <text fill="currentColor" fontSize="7.6" letterSpacing="2.2" fontFamily="ui-monospace, monospace">
        <textPath href="#seal-path">BUILDING COSVERSE · DEV BADODIYA · </textPath>
      </text>
      <circle cx="50" cy="50" r="2.2" fill="currentColor" />
    </svg>
  );
}
