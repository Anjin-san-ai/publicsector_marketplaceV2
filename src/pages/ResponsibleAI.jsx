import { useState, useMemo } from 'react';
import {
  Shield, Scale, Eye, Lock, ShieldCheck, Users, Gauge, Activity,
  CheckCircle2, AlertTriangle, FileText, Database, Clock,
  Cpu, Leaf, ChevronDown, BadgeCheck, AlertOctagon,
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { responsibleAIPerApp, availableAppsForRAI } from '../data/responsibleAIPerApp';
import { nhsApps } from '../data/nhsAppsData';
import { mhclgApps } from '../data/mhclgAppsData';
import { defraApps } from '../data/defraAppsData';
import { defenceApps } from '../data/defenceAppsData';
import { transportApps } from '../data/transportAppsData';

// ───────── Look-ups ─────────

const allApps = [...nhsApps, ...mhclgApps, ...defraApps, ...defenceApps, ...transportApps];
const findApp = (id) => allApps.find(a => a.id === id);

// Group apps by department for the dropdown
const groupedApps = availableAppsForRAI.reduce((acc, a) => {
  acc[a.department] = acc[a.department] || [];
  acc[a.department].push(a);
  return acc;
}, {});
const departmentOrder = ['NHS', 'MHCLG', 'Defra', 'MOD', 'DfT'];

// ───────── Pillar metadata ─────────

const pillarMeta = {
  fairness:       { icon: Scale,        label: 'Fairness & Bias',          desc: 'Equity across demographics, geography, and protected characteristics.' },
  transparency:   { icon: Eye,          label: 'Transparency & Explainability', desc: 'Decisions are traceable, documented, and explainable to users and reviewers.' },
  privacy:        { icon: Lock,         label: 'Privacy & Data Protection',  desc: 'Data is minimised, secured, and handled per GDPR and sector requirements.' },
  safety:         { icon: ShieldCheck,  label: 'Safety & Robustness',        desc: 'Defences against hallucination, prompt injection, and adversarial inputs.' },
  accountability: { icon: Users,        label: 'Accountability & Oversight', desc: 'Named owners, immutable audit trails, governance review cadences.' },
  reliability:    { icon: Gauge,        label: 'Reliability & Performance',  desc: 'Uptime, accuracy, drift detection, and operational SLAs.' },
};

const scoreColor = (s) => s >= 95 ? '#16a34a' : s >= 90 ? '#1d70b8' : s >= 80 ? '#d97706' : '#dc2626';
const scoreLabel = (s) => s >= 95 ? 'Excellent' : s >= 90 ? 'Strong' : s >= 80 ? 'Acceptable' : 'Needs Action';
const riskColor = (r) => {
  if (r === 'High Risk' || r === 'Unacceptable Risk') return '#dc2626';
  if (r === 'Limited Risk') return '#d97706';
  return '#16a34a';
};
const severityColor = (s) => s === 'Critical' ? '#dc2626' : s === 'High' ? '#ea580c' : s === 'Medium' ? '#d97706' : '#16a34a';

// ───────── Sub-components ─────────

const CircularGauge = ({ value, size = 180, label }) => {
  const radius = (size - 24) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const colour = scoreColor(value);
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="var(--color-border)" strokeWidth="10" fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke={colour} strokeWidth="10" fill="none"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 2,
      }}>
        <p style={{ fontSize: 38, fontWeight: 800, color: 'var(--color-text-primary)', margin: 0, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{value}</p>
        <p style={{ fontSize: 11, color: 'var(--color-text-muted)', margin: 0, letterSpacing: '0.04em' }}>/ 100</p>
        {label && <p style={{ fontSize: 10, fontWeight: 700, color: colour, margin: 0, marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</p>}
      </div>
    </div>
  );
};

const PillarCard = ({ pillarKey, pillar }) => {
  const meta = pillarMeta[pillarKey];
  const colour = scoreColor(pillar.score);
  return (
    <div className="card reveal" style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="app-card-icon" style={{ width: 36, height: 36, flexShrink: 0 }}>
            <meta.icon size={16} />
          </div>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text-primary)', margin: 0, lineHeight: 1.3 }}>{meta.label}</h3>
            <p style={{ fontSize: 10, color: 'var(--color-text-muted)', margin: 0, marginTop: 2, lineHeight: 1.5 }}>{meta.desc}</p>
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <p style={{ fontSize: 22, fontWeight: 800, color: colour, margin: 0, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{pillar.score}</p>
          <p style={{ fontSize: 9, fontWeight: 700, color: colour, margin: 0, marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{pillar.status}</p>
        </div>
      </div>
      <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {pillar.metrics.map((m) => (
          <div key={m.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <span style={{ fontSize: 11, color: 'var(--color-text-muted)', lineHeight: 1.4 }}>{m.label}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-primary)', fontVariantNumeric: 'tabular-nums' }}>{m.value}</span>
              <span style={{ fontSize: 9, color: 'var(--color-text-muted)' }}>/ {m.target}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const KvRow = ({ label, value }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '8px 0', borderBottom: '1px dashed var(--color-border)' }}>
    <span style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>{label}</span>
    <span style={{ fontSize: 12, color: 'var(--color-text-primary)', fontWeight: 600, textAlign: 'right' }}>{value}</span>
  </div>
);

const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }} className="reveal">
    <div className="app-card-icon" style={{ width: 36, height: 36 }}>
      <Icon size={16} />
    </div>
    <div>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>{title}</h2>
      {subtitle && <p style={{ fontSize: 12, color: 'var(--color-text-muted)', margin: 0, marginTop: 2 }}>{subtitle}</p>}
    </div>
  </div>
);

// ───────── Page ─────────

const ResponsibleAI = () => {
  const [selectedId, setSelectedId] = useState('sentry-ai-a400');
  const data = responsibleAIPerApp[selectedId];
  const app = findApp(selectedId);

  const overallScore = useMemo(() => {
    const scores = Object.values(data.pillars).map(p => p.score);
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }, [data]);

  const complianceAvg = useMemo(() => {
    return Math.round(data.compliance.reduce((a, c) => a + c.score, 0) / data.compliance.length);
  }, [data]);

  const AppIcon = app?.icon || Shield;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-primary)' }}>

      <PageHeader
        eyebrow="Governance"
        icon={Shield}
        title="Responsible AI Dashboard"
        highlight="Responsible AI"
        subtitle="Per-application transparency across fairness, safety, privacy, accountability, and compliance. Select any deployed application to inspect its live posture, model card, oversight metrics, and audit history."
      />

      {/* App selector — sits directly below the page header */}
      <div style={{ padding: '24px var(--section-padding-x) 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 480 }}>
          <label htmlFor="app-select" style={{ fontSize: 'var(--text-label)', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Tracked Application
          </label>
          <div style={{ position: 'relative' }}>
            <select
              id="app-select"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              style={{
                width: '100%',
                appearance: 'none',
                padding: '12px 40px 12px 16px',
                border: '1px solid var(--color-border-strong)',
                borderRadius: 'var(--radius-card)',
                background: 'var(--color-bg-primary)',
                color: 'var(--color-text-primary)',
                fontSize: 14,
                fontWeight: 600,
                fontFamily: 'var(--font-body)',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              {departmentOrder.map(dept => (
                groupedApps[dept] && (
                  <optgroup key={dept} label={dept}>
                    {groupedApps[dept].map(a => (
                      <option key={a.id} value={a.id}>{a.name}</option>
                    ))}
                  </optgroup>
                )
              ))}
            </select>
            <ChevronDown size={16} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--color-text-muted)' }} />
          </div>
        </div>
      </div>

      <div style={{ padding: '32px var(--section-padding-x)' }}>

        {/* ─── App Summary Card ─── */}
        <div className="card reveal" style={{ padding: '28px 32px', marginBottom: 24, display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div className="app-card-icon" style={{ width: 52, height: 52, flexShrink: 0 }}>
                <AppIcon size={22} />
              </div>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-text-primary)', margin: 0, letterSpacing: '-0.01em' }}>{app?.name}</h2>
                <p style={{ fontSize: 12, color: 'var(--color-text-muted)', margin: 0, marginTop: 4 }}>
                  <strong>{data.department}</strong> · {app?.category} · Provider: <strong>{app?.provider}</strong>
                </p>
              </div>
            </div>
            <p style={{ fontSize: 13, color: 'var(--color-text-primary)', margin: 0, lineHeight: 1.7, maxWidth: 640 }}>{data.summary}</p>

            {/* Risk + status pills */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 700, padding: '6px 12px', borderRadius: 'var(--radius-pill)', background: `${riskColor(data.euAIAct)}1A`, color: riskColor(data.euAIAct), border: `1px solid ${riskColor(data.euAIAct)}40`, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <AlertOctagon size={11} /> EU AI Act: {data.euAIAct}
              </span>
              <span style={{ fontSize: 11, fontWeight: 600, padding: '6px 12px', borderRadius: 'var(--radius-pill)', background: 'rgba(29,112,184,0.10)', color: 'var(--color-accent)' }}>UK AI Regime: {data.ukAIRegime}</span>
              <span style={{ fontSize: 11, fontWeight: 600, padding: '6px 12px', borderRadius: 'var(--radius-pill)', background: 'rgba(22,163,74,0.10)', color: '#16a34a' }}>Data Residency: {data.dataResidency}</span>
              <span style={{ fontSize: 11, fontWeight: 600, padding: '6px 12px', borderRadius: 'var(--radius-pill)', background: 'rgba(22,163,74,0.10)', color: '#16a34a', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <BadgeCheck size={11} /> Production Approved
              </span>
            </div>
          </div>

          <CircularGauge value={overallScore} size={180} label={scoreLabel(overallScore)} />
        </div>

        {/* ─── Top KPI strip ─── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 32 }}>
          {[
            { icon: BadgeCheck, label: 'Compliance Avg', value: `${complianceAvg}%`, sub: `${data.compliance.length} frameworks` },
            { icon: Activity,    label: 'Uptime (90d)',   value: `${data.performance.uptime}%`, sub: `p95 ${data.performance.p95Latency}ms` },
            { icon: Users,       label: 'Human Review',   value: `${data.humanOversight.humanReviewRate}%`, sub: `Override ${data.humanOversight.overrideRate}%` },
            { icon: AlertTriangle, label: 'Open Incidents', value: data.incidents.filter(i => !i.resolved).length, sub: `${data.incidents.length} in 90d` },
            { icon: Leaf,        label: 'Green Energy',   value: `${data.sustainability.greenEnergy}%`, sub: `${data.sustainability.co2Kg} kg CO₂ / 90d` },
          ].map((kpi) => (
            <div key={kpi.label} className="card reveal" style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{kpi.label}</span>
                <kpi.icon size={14} style={{ color: 'var(--color-text-muted)' }} />
              </div>
              <p style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-text-primary)', margin: 0, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{kpi.value}</p>
              <p style={{ fontSize: 11, color: 'var(--color-text-muted)', margin: 0 }}>{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* ─── Six pillars ─── */}
        <SectionHeader icon={Shield} title="Responsible AI — Six Pillars" subtitle="Live scores against agreed targets, refreshed nightly." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
          {Object.entries(data.pillars).map(([key, pillar]) => (
            <PillarCard key={key} pillarKey={key} pillar={pillar} />
          ))}
        </div>

        {/* ─── Compliance + Human Oversight ─── */}
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 24, marginBottom: 40 }}>
          {/* Compliance */}
          <div>
            <SectionHeader icon={BadgeCheck} title="Compliance & Frameworks" subtitle="Sector and statutory compliance status with last audit dates." />
            <div className="card reveal" style={{ padding: '8px 0' }}>
              {data.compliance.map((c, i) => (
                <div key={c.framework} style={{
                  padding: '14px 22px',
                  borderBottom: i < data.compliance.length - 1 ? '1px solid var(--color-border)' : 'none',
                  display: 'grid',
                  gridTemplateColumns: '1fr 100px 80px',
                  gap: 16,
                  alignItems: 'center',
                }}>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)', margin: 0, lineHeight: 1.4 }}>{c.framework}</p>
                    <p style={{ fontSize: 10, color: 'var(--color-text-muted)', margin: 0, marginTop: 2 }}>Last audit: {c.lastAudit}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ flex: 1, height: 6, background: 'var(--color-border)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ width: `${c.score}%`, height: '100%', background: scoreColor(c.score), borderRadius: 3 }} />
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-primary)', fontVariantNumeric: 'tabular-nums', minWidth: 28, textAlign: 'right' }}>{c.score}%</span>
                  </div>
                  <span style={{
                    fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 'var(--radius-pill)',
                    background: c.status === 'compliant' ? 'rgba(22,163,74,0.12)' : 'rgba(217,119,6,0.12)',
                    color: c.status === 'compliant' ? '#16a34a' : '#d97706',
                    textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'center',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                  }}>
                    {c.status === 'compliant' ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                    {c.status === 'compliant' ? 'Compliant' : 'In Progress'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Human Oversight */}
          <div>
            <SectionHeader icon={Users} title="Human Oversight" subtitle="Where humans stay in the loop." />
            <div className="card reveal" style={{ padding: '24px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ background: 'rgba(29,112,184,0.08)', padding: '14px 16px', borderRadius: 'var(--radius-card)', borderLeft: '3px solid var(--color-accent)' }}>
                <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0, marginBottom: 4 }}>Loop Posture</p>
                <p style={{ fontSize: 12, color: 'var(--color-text-primary)', margin: 0, lineHeight: 1.5 }}>{data.humanOversight.modelInLoop}</p>
              </div>
              <KvRow label="Human Review Rate"     value={`${data.humanOversight.humanReviewRate}%`} />
              <KvRow label="Override Rate"         value={`${data.humanOversight.overrideRate}%`} />
              <KvRow label="Avg Review Time"        value={`${data.humanOversight.avgReviewTimeSec}s`} />
              <KvRow label="Escalations / week"     value={data.humanOversight.escalationsPerWeek} />
            </div>
          </div>
        </div>

        {/* ─── Model card + Data lineage ─── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 40 }}>
          <div>
            <SectionHeader icon={Cpu} title="Model Card" subtitle="What model, which version, when last evaluated." />
            <div className="card reveal" style={{ padding: '20px 24px' }}>
              <KvRow label="Base Model"          value={data.modelCard.baseModel} />
              <KvRow label="Architecture"        value={data.modelCard.architecture} />
              <KvRow label="Version"             value={data.modelCard.version} />
              <KvRow label="Last Fine-Tuned"     value={data.modelCard.lastFineTuned} />
              <KvRow label="Training Data Cutoff" value={data.modelCard.trainingDataCutoff} />
              <div style={{ paddingTop: 8 }}>
                <KvRow label="Eval Framework"   value={data.modelCard.evaluationFramework} />
              </div>
            </div>
          </div>

          <div>
            <SectionHeader icon={Database} title="Data Lineage" subtitle="Sources, purposes, and lawful bases." />
            <div className="card reveal" style={{ padding: '8px 0' }}>
              {data.dataLineage.map((d, i) => (
                <div key={d.source} style={{
                  padding: '14px 24px',
                  borderBottom: i < data.dataLineage.length - 1 ? '1px solid var(--color-border)' : 'none',
                }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>{d.source}</p>
                  <p style={{ fontSize: 11, color: 'var(--color-text-muted)', margin: 0, marginTop: 4 }}>
                    <strong>Purpose:</strong> {d.purpose} · <strong>Basis:</strong> {d.consent}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Incidents + Audit Trail + Sustainability ─── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginBottom: 40 }}>
          {/* Incidents */}
          <div>
            <SectionHeader icon={AlertTriangle} title="Incident Log (90d)" subtitle="Every operational anomaly, all resolved before review." />
            <div className="card reveal" style={{ padding: '8px 0' }}>
              {data.incidents.length === 0 ? (
                <p style={{ fontSize: 12, color: 'var(--color-text-muted)', textAlign: 'center', padding: '20px 0', margin: 0 }}>
                  No incidents in the last 90 days.
                </p>
              ) : data.incidents.map((inc, i) => (
                <div key={inc.date + inc.title} style={{
                  padding: '14px 22px',
                  borderBottom: i < data.incidents.length - 1 ? '1px solid var(--color-border)' : 'none',
                  display: 'flex', flexDirection: 'column', gap: 6,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <span style={{ fontSize: 10, color: 'var(--color-text-muted)', fontWeight: 600 }}>{inc.date}</span>
                    <span style={{
                      fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 'var(--radius-pill)',
                      background: `${severityColor(inc.severity)}1A`, color: severityColor(inc.severity),
                      textTransform: 'uppercase', letterSpacing: '0.06em',
                    }}>{inc.severity}</span>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--color-text-primary)', margin: 0, lineHeight: 1.5 }}>{inc.title}</p>
                  {inc.resolved && (
                    <span style={{ fontSize: 10, color: '#16a34a', display: 'inline-flex', alignItems: 'center', gap: 4, fontWeight: 600 }}>
                      <CheckCircle2 size={10} /> Resolved
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Audit trail */}
          <div>
            <SectionHeader icon={FileText} title="Recent Audit Trail" subtitle="Governance reviews, recertifications, model deployments." />
            <div className="card reveal" style={{ padding: '8px 0' }}>
              {data.auditTrail.map((a, i) => (
                <div key={a.date + a.action} style={{
                  padding: '14px 22px',
                  borderBottom: i < data.auditTrail.length - 1 ? '1px solid var(--color-border)' : 'none',
                  display: 'flex', flexDirection: 'column', gap: 4,
                }}>
                  <span style={{ fontSize: 10, color: 'var(--color-text-muted)', fontWeight: 600 }}>{a.date}</span>
                  <p style={{ fontSize: 12, color: 'var(--color-text-primary)', margin: 0, fontWeight: 600 }}>{a.actor}</p>
                  <p style={{ fontSize: 11, color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>{a.action}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sustainability + perf */}
          <div>
            <SectionHeader icon={Leaf} title="Sustainability & Performance" subtitle="Energy, carbon, and operational telemetry." />
            <div className="card reveal" style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0, marginBottom: 8 }}>Sustainability (90d)</p>
                <KvRow label="Energy Used"       value={`${data.sustainability.energyKwh} kWh`} />
                <KvRow label="CO₂ Emissions"      value={`${data.sustainability.co2Kg} kg CO₂e`} />
                <KvRow label="PUE"                value={data.sustainability.pue} />
                <KvRow label="Renewable Energy"   value={`${data.sustainability.greenEnergy}%`} />
              </div>
              <div style={{ paddingTop: 8 }}>
                <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0, marginBottom: 8 }}>Performance</p>
                <KvRow label="Uptime (90d)"       value={`${data.performance.uptime}%`} />
                <KvRow label="p95 Latency"        value={`${data.performance.p95Latency}ms`} />
                <KvRow label="Accuracy"           value={`${data.performance.accuracy}%`} />
                <KvRow label="Throughput"         value={data.performance.throughput} />
              </div>
            </div>
          </div>
        </div>

        {/* ─── Footer methodology ─── */}
        <div className="card reveal" style={{ padding: '20px 28px', background: 'var(--color-bg-surface)', borderLeft: '3px solid var(--color-accent)' }}>
          <p style={{ fontSize: 12, color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.7 }}>
            <strong style={{ color: 'var(--color-text-primary)' }}>Methodology.</strong> Scores are computed nightly from telemetry, audit logs, and quarterly governance reviews. Compliance status reflects the most recent assessor sign-off. Pillar weighting follows the <strong>UK AI Safety Institute reference framework</strong> aligned with <strong>EU AI Act Annex III</strong>, <strong>ISO/IEC 42001</strong>, and <strong>NIST AI Risk Management Framework</strong>. Anomalies trigger an automated escalation to the named application owner within the listed SLA.
          </p>
        </div>

      </div>
    </div>
  );
};

export default ResponsibleAI;
