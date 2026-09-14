import { NavLink, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { identityService } from './services/domains/identity/identity.service';
import { projectsService } from './services/domains/projects/projects.service';
import { commentsService } from './services/domains/comments/comments.service';
import { aggregatesService } from './services/domains/aggregates/aggregates.service';
import { alertsService } from './services/domains/alerts/alerts.service';
import { dossiersService } from './services/domains/dossiers/dossiers.service';
import { externalLinksService } from './services/domains/external-links/external-links.service';
import { clearAccessToken } from './services/shared/infrastructure';
import { ProjectsView } from './features/projects/views/ProjectsView';

function unwrap(res: any) {
  return res?.data ?? res;
}
function itemsOf(res: any) {
  const d = unwrap(res);
  return d?.items ?? (Array.isArray(d) ? d : []);
}

function Nia() {
  return <div className="nia">Risk intelligence — not investment advice.</div>;
}

function LoginPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState('analyst@demo.local');
  const [password, setPassword] = useState('sandbox-analyst-8');
  const [err, setErr] = useState('');
  return (
    <div className="login">
      <div className="wordmark">Chatterisk</div>
      <h1>Volume-honest social risk</h1>
      <p>Scores weight how much was said. Not a buy signal.</p>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setErr('');
          try {
            await identityService.login(email, password);
            nav('/watchlist');
          } catch (ex: any) {
            setErr(ex.message || 'Login failed — using demo key session');
            nav('/watchlist');
          }
        }}
      >
        <div className="row">
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
        </div>
        <p>
          <button className="primary" type="submit">
            Enter listing desk
          </button>
        </p>
        {err && <p className="error">{err}</p>}
      </form>
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  const nav = useNavigate();
  return (
    <div className="shell">
      <aside className="nav">
        <div className="wordmark">Chatterisk</div>
        <p className="mono" style={{ fontSize: 11, color: 'var(--color-mute)' }}>
          radar tower
        </p>
        <NavLink to="/watchlist">Watchlist</NavLink>
        <NavLink to="/alerts">Alert queue</NavLink>
        <NavLink to="/bots">Bot rulings</NavLink>
        <NavLink to="/thresholds">Thresholds</NavLink>
        <NavLink to="/dossiers">Dossiers</NavLink>
        <NavLink to="/retention">Retention</NavLink>
        <NavLink to="/links">Scan links</NavLink>
        <NavLink to="/badge">Partner badge</NavLink>
        <NavLink to="/generated">Generated views</NavLink>
        <button
          onClick={() => {
            clearAccessToken();
            nav('/login');
          }}
        >
          Sign out
        </button>
      </aside>
      <div className="main">
        <Nia />
        {children}
      </div>
    </div>
  );
}

function WatchlistPage() {
  const q = useQuery({ queryKey: ['projects'], queryFn: () => projectsService.list(true) });
  const rows = itemsOf(q.data);
  return (
    <div>
      <h1>Listing desk</h1>
      <p>Which watched tokens show collapse or thin-sample hype?</p>
      {q.isLoading && <p>Loading watchlist…</p>}
      {q.error && <p className="error">{String((q.error as Error).message)}</p>}
      <table>
        <thead>
          <tr>
            <th>Project</th>
            <th>Ticker</th>
            <th>Address</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p: any) => (
            <tr key={p.projectId}>
              <td>{p.name}</td>
              <td className="mono">{p.ticker}</td>
              <td className="mono">{p.contractAddress}</td>
              <td>
                <NavLink to={`/projects/${p.projectId}`}>Open radar</NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RadarPage() {
  const { projectId = '' } = useParams();
  const [window, setWindow] = useState('7d');
  const [openComment, setOpenComment] = useState<any>(null);
  const project = useQuery({ queryKey: ['project', projectId], queryFn: () => projectsService.get(projectId) });
  const agg = useQuery({
    queryKey: ['agg', projectId, window],
    queryFn: () => aggregatesService.latest({ projectId, window }),
  });
  const comments = useQuery({
    queryKey: ['comments', projectId],
    queryFn: () => commentsService.listByProject(projectId),
  });
  const links = useQuery({
    queryKey: ['links', projectId],
    queryFn: () => externalLinksService.list(projectId),
  });
  const a = unwrap(agg.data);
  const p = unwrap(project.data);
  const thin = Boolean(a?.thinSample) || Number(a?.sampleSize ?? 0) < 20;
  const flare = Number(a?.adjustedScore ?? 0) < -0.3;
  return (
    <div>
      <h1>{p?.name ?? 'Project radar'}</h1>
      <p className="mono">{p?.contractAddress}</p>
      <div className="row">
        <select value={window} onChange={(e) => setWindow(e.target.value)}>
          <option value="1d">1d</option>
          <option value="7d">7d</option>
          <option value="30d">30d</option>
        </select>
      </div>
      <div className={`gauge ${thin ? 'thin' : ''} ${flare ? 'flare' : ''}`}>
        {a?.adjustedScore ?? '—'}
      </div>
      <p>
        sample n={a?.sampleSize ?? '—'} · weight {a?.volumeWeight ?? '—'} · bot exclusion {a?.botExclusionVolume ?? a?.botDownweightedCount ?? '—'} · model{' '}
        <span className="mono">{a?.modelVersion}</span>
      </p>
      {thin && <p className="error">Thin sample — not consensus.</p>}
      <div className="panel">
        <h2>Top comments</h2>
        {itemsOf(comments.data).map((c: any) => (
          <p key={c.commentId}>
            <button onClick={() => setOpenComment(c)}>{c.textPurged ? 'text purged — aggregate retained' : c.text}</button>{' '}
            <span className="mono">{c.tanhScore}</span> {c.botSuspect && <span className="struck">bot</span>}
          </p>
        ))}
      </div>
      <div className="panel">
        <h2>External scan</h2>
        {itemsOf(links.data).length === 0 && <p>Social-only badge — no bytecode scan linked.</p>}
        {itemsOf(links.data).map((l: any) => (
          <span className="badge" key={l.linkId}>
            {l.provider || 'scan'} {l.externalScanId}
          </span>
        ))}
      </div>
      {openComment && (
        <div className="panel">
          <h2>Comment evidence</h2>
          <p>{openComment.textPurged ? 'text purged — aggregate retained.' : openComment.text}</p>
          <p className="mono">
            {openComment.channel} · {openComment.commentId}
          </p>
          <button onClick={() => commentsService.applyRuling(openComment.commentId, { kind: 'coordinated_inauthentic' })}>
            Mark coordinated inauthentic
          </button>
          <button onClick={() => commentsService.redact(openComment.commentId)}>Redact PII</button>
        </div>
      )}
    </div>
  );
}

function AlertsPage() {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ['alerts'], queryFn: () => alertsService.list() });
  const ack = useMutation({
    mutationFn: (id: string) => alertsService.acknowledge(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['alerts'] }),
  });
  return (
    <div>
      <h1>Alert queue</h1>
      {itemsOf(q.data).length === 0 && !q.isLoading && <p>Queue healthy — no open flares.</p>}
      <table>
        <thead>
          <tr>
            <th>Kind</th>
            <th>Project</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {itemsOf(q.data).map((a: any) => (
            <tr key={a.alertId}>
              <td>{a.kind}</td>
              <td>
                <NavLink to={`/projects/${a.projectId}`}>{a.projectId}</NavLink>
              </td>
              <td>{a.status}</td>
              <td>
                <button onClick={() => ack.mutate(a.alertId)}>Ack</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BotsPage() {
  const q = useQuery({ queryKey: ['rulings'], queryFn: () => commentsService.listRulings() });
  return (
    <div>
      <h1>Bot / inauthentic desk</h1>
      {itemsOf(q.data).length === 0 && <p>No active rulings.</p>}
      <table>
        <thead>
          <tr>
            <th>Kind</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {itemsOf(q.data).map((r: any) => (
            <tr key={r.rulingId}>
              <td>{r.kind}</td>
              <td className="mono">{r.commentId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ThresholdsPage() {
  const q = useQuery({ queryKey: ['policies'], queryFn: () => alertsService.listPolicies() });
  const [threshold, setThreshold] = useState('-0.35');
  return (
    <div>
      <h1>Workspace thresholds</h1>
      {itemsOf(q.data).map((p: any) => (
        <div className="panel" key={p.policyId}>
          <p>
            {p.workspaceId} cutoff {p.threshold} window {p.window} {p.niaLocked ? 'NIA locked' : ''}
          </p>
        </div>
      ))}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alertsService.createPolicy({ workspaceId: 'listing-desk', threshold: Number(threshold), window: '7d' });
        }}
      >
        <input value={threshold} onChange={(e) => setThreshold(e.target.value)} />
        <button className="primary" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

function DossiersPage() {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ['dossiers'], queryFn: () => dossiersService.list() });
  const [projectId, setProjectId] = useState('prj_01hzykx8j0m0w5n6p7q8r9s0t1');
  return (
    <div>
      <h1>Committee dossiers</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const end = new Date();
          const start = new Date(end.getTime() - 7 * 86400000);
          await dossiersService.create({
            projectId,
            periodStart: start.toISOString(),
            periodEnd: end.toISOString(),
          });
          await qc.invalidateQueries({ queryKey: ['dossiers'] });
        }}
      >
        <input value={projectId} onChange={(e) => setProjectId(e.target.value)} />
        <button className="primary">Generate pack</button>
      </form>
      {itemsOf(q.data).map((d: any) => (
        <div className="panel" key={d.dossierId}>
          <p>
            {d.projectId} · {d.status} · model {d.modelVersion} · watermark {String(d.niaWatermark)}
          </p>
          <p className="mono">{d.contentHash}</p>
        </div>
      ))}
    </div>
  );
}

function RetentionPage() {
  const q = useQuery({ queryKey: ['retention'], queryFn: () => commentsService.getRetention() });
  const p = unwrap(q.data);
  return (
    <div>
      <h1>Retention / redaction</h1>
      <p>Raw comments {p?.rawCommentDays ?? '—'} days. Aggregates retained: {String(p?.aggregateRetain)}</p>
      <button onClick={() => commentsService.runRetention()}>Run purge job</button>
    </div>
  );
}

function LinksPage() {
  const q = useQuery({ queryKey: ['all-links'], queryFn: () => externalLinksService.list() });
  const [projectId, setProjectId] = useState('prj_01hzykx8j0m0w5n6p7q8r9s0t1');
  const [scanId, setScanId] = useState('scan_demo');
  return (
    <div>
      <h1>External scan correlation</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          externalLinksService.create({ projectId, externalScanId: scanId, provider: 'external' });
        }}
      >
        <input value={projectId} onChange={(e) => setProjectId(e.target.value)} />
        <input value={scanId} onChange={(e) => setScanId(e.target.value)} />
        <button className="primary">Link scan</button>
      </form>
      {itemsOf(q.data).map((l: any) => (
        <p key={l.linkId}>
          {l.projectId} → {l.externalScanId}{' '}
          <button onClick={() => externalLinksService.remove(l.linkId)}>Unlink</button>
        </p>
      ))}
    </div>
  );
}

function BadgePage() {
  const [addr, setAddr] = useState('0x0000000000000000000000000000000000000001');
  const q = useQuery({
    queryKey: ['badge', addr],
    queryFn: () => aggregatesService.badge(addr),
  });
  const b = unwrap(q.data);
  return (
    <div>
      <h1>Partner risk badge</h1>
      <input value={addr} onChange={(e) => setAddr(e.target.value)} className="mono" />
      <div className="panel">
        <p className="badge">{b?.state ?? 'unknown'}</p>
        <p>
          score {b?.adjustedScore ?? '—'} n={b?.sampleSize ?? 0}
        </p>
        <p>{b?.disclaimer}</p>
      </div>
    </div>
  );
}

function GeneratedPage() {
  return (
    <div>
      <h1>Codegen feature shells</h1>
      <ProjectsView />
    </div>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/*"
        element={
          <Shell>
            <Routes>
              <Route path="/" element={<Navigate to="/watchlist" replace />} />
              <Route path="/watchlist" element={<WatchlistPage />} />
              <Route path="/projects/:projectId" element={<RadarPage />} />
              <Route path="/alerts" element={<AlertsPage />} />
              <Route path="/bots" element={<BotsPage />} />
              <Route path="/thresholds" element={<ThresholdsPage />} />
              <Route path="/dossiers" element={<DossiersPage />} />
              <Route path="/retention" element={<RetentionPage />} />
              <Route path="/links" element={<LinksPage />} />
              <Route path="/badge" element={<BadgePage />} />
              <Route path="/generated" element={<GeneratedPage />} />
            </Routes>
          </Shell>
        }
      />
    </Routes>
  );
}
