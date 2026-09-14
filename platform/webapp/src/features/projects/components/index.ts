export function VolumeAdjustedScore(props: { score?: number; sampleSize?: number; window?: string }) {
  return (
    <div>
      <strong>{props.score ?? '—'}</strong>
      <span> n={props.sampleSize ?? '—'} {props.window}</span>
    </div>
  );
}

export function ThinSampleVeil({ children, thin }: { children: React.ReactNode; thin?: boolean }) {
  return <div style={{ opacity: thin ? 0.65 : 1 }}>{children}</div>;
}

export function NiaDisclaimerStrip() {
  return <div className="nia">Risk intelligence — not investment advice.</div>;
}
