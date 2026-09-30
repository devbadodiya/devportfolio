export function PageHeader({
  kicker,
  title,
  lede,
  meta,
}: {
  kicker: string;
  title: string;
  lede?: string;
  meta?: string;
}) {
  return (
    <header className="page-intro">
      <p className="kicker">{kicker}</p>
      <h1>{title}</h1>
      {meta ? <p className="meta-line">{meta}</p> : null}
      {lede ? <p className="lede">{lede}</p> : null}
    </header>
  );
}
