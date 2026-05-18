// Per-app Responsible AI tracking data
// Each app has comprehensive metrics across 6 RAI pillars + compliance, model card,
// data lineage, human oversight, incidents, audit trail, sustainability.

const buildApp = (overrides) => ({
  // Defaults common across most public sector apps
  euAIAct: 'High Risk',
  ukAIRegime: 'Aligned',
  dataResidency: 'UK / EMEA',
  modelCard: {
    baseModel: 'GPT-4o',
    architecture: 'Transformer · multi-modal',
    version: 'v2.4.1',
    lastFineTuned: '2026-03-14',
    trainingDataCutoff: '2025-Q4',
    evaluationFramework: 'HELM · MMLU · custom domain benchmarks',
  },
  sustainability: {
    energyKwh: '12,400',
    co2Kg: '4,200',
    pue: '1.18',
    greenEnergy: 92,
  },
  performance: {
    uptime: 99.94,
    p95Latency: 380,
    accuracy: 96.2,
    throughput: '1.2k req/min',
  },
  ...overrides,
});

export const responsibleAIPerApp = {

  // ────────────────── NHS ──────────────────

  'virtual-clinician': buildApp({
    department: 'NHS',
    euAIAct: 'High Risk',
    summary: 'Patient-facing triage assistant. Subject to MHRA SaMD oversight and full clinical governance review.',
    pillars: {
      fairness:        { score: 96, status: 'Excellent', metrics: [
        { label: 'Demographic parity (age)',           value: 0.97, target: 0.90 },
        { label: 'Equal opportunity (ethnicity)',      value: 0.95, target: 0.90 },
        { label: 'Disparate impact ratio',             value: 0.93, target: 0.80 },
        { label: 'Subgroup error variance',            value: '±2.1%', target: '<5%' },
      ]},
      transparency:    { score: 98, status: 'Excellent', metrics: [
        { label: 'Decision explanation coverage',      value: '100%', target: '100%' },
        { label: 'Model card published',               value: 'Yes',  target: 'Yes' },
        { label: 'Reasoning trace available',          value: 'Yes',  target: 'Yes' },
        { label: 'Confidence score exposed to user',   value: 'Yes',  target: 'Yes' },
      ]},
      privacy:         { score: 99, status: 'Excellent', metrics: [
        { label: 'GDPR Art. 35 DPIA completed',        value: 'Yes',  target: 'Yes' },
        { label: 'PII redaction rate',                 value: '99.8%', target: '99%' },
        { label: 'Data minimisation score',            value: 95,    target: 90 },
        { label: 'Retention policy (days)',            value: 30,    target: '≤30' },
      ]},
      safety:          { score: 97, status: 'Excellent', metrics: [
        { label: 'Hallucination rate',                 value: '0.4%', target: '<2%' },
        { label: 'Adversarial robustness',             value: 96,    target: 90 },
        { label: 'Prompt injection defence',           value: 'Layered',  target: 'Active' },
        { label: 'Safety guardrails active',           value: 12,    target: '≥8' },
      ]},
      accountability:  { score: 99, status: 'Excellent', metrics: [
        { label: 'Audit trail completeness',           value: '100%', target: '100%' },
        { label: 'Named clinical owner',               value: 'Dr. M Chen', target: 'Required' },
        { label: 'Incident escalation SLA (mins)',     value: 5,     target: '≤15' },
        { label: 'Quarterly governance review',        value: 'On track', target: 'Required' },
      ]},
      reliability:     { score: 98, status: 'Excellent', metrics: [
        { label: 'Uptime (90d)',                       value: '99.97%', target: '≥99.9%' },
        { label: 'Diagnostic accuracy vs gold panel',  value: '96.4%', target: '≥92%' },
        { label: 'Drift detection alerts (30d)',       value: 0,     target: '≤2' },
        { label: 'Regression test pass rate',          value: '100%', target: '100%' },
      ]},
    },
    compliance: [
      { framework: 'NHS DSPT (Data Security & Protection Toolkit)', score: 100, status: 'compliant', lastAudit: '2026-04-12' },
      { framework: 'MHRA Software as Medical Device (SaMD) Class II', score: 98, status: 'compliant', lastAudit: '2026-03-22' },
      { framework: 'GDS Service Standard',                            score: 96, status: 'compliant', lastAudit: '2026-02-08' },
      { framework: 'WCAG 2.2 AA',                                     score: 100, status: 'compliant', lastAudit: '2026-04-30' },
      { framework: 'EU AI Act — Annex III (Healthcare)',              score: 97, status: 'compliant', lastAudit: '2026-03-01' },
      { framework: 'ISO/IEC 42001 (AI Management Systems)',           score: 95, status: 'compliant', lastAudit: '2026-01-19' },
      { framework: 'NICE Evidence Standards Framework Tier C',         score: 94, status: 'in-progress', lastAudit: '2026-04-04' },
    ],
    humanOversight: {
      humanReviewRate: 100,
      overrideRate: 8.4,
      avgReviewTimeSec: 42,
      escalationsPerWeek: 47,
      clinicianApprovalRequired: true,
      modelInLoop: 'Advisory only — clinician confirms every decision',
    },
    dataLineage: [
      { source: 'NHS Spine (de-identified)',    purpose: 'Symptom triage corpus',  consent: 'Public task lawful basis' },
      { source: 'SNOMED CT UK Edition',          purpose: 'Clinical terminology',   consent: 'Licensed' },
      { source: 'NICE Clinical Guidelines',      purpose: 'Evidence base',          consent: 'Public' },
      { source: 'Anonymised consultation logs',  purpose: 'Fine-tuning',            consent: 'Opt-in only' },
    ],
    incidents: [
      { date: '2026-04-22', severity: 'Low',    title: 'Latency spike — 1.4s p95 for 18 mins',  resolved: true },
      { date: '2026-03-08', severity: 'Medium', title: 'Drift detected on respiratory subset',   resolved: true },
      { date: '2026-01-15', severity: 'Low',    title: 'Translation gap (Welsh) — fix shipped',  resolved: true },
    ],
    auditTrail: [
      { date: '2026-05-08', actor: 'NHS Digital RAI Board',    action: 'Quarterly review · Approved' },
      { date: '2026-04-12', actor: 'DSPT Auditor',             action: 'Annual DSPT certification renewed' },
      { date: '2026-03-14', actor: 'MLOps Team',                action: 'Model v2.4.1 deployed · Canary 5% → 100%' },
      { date: '2026-02-28', actor: 'Clinical Safety Officer',   action: 'Hazard log updated — 0 new hazards' },
    ],
  }),

  'jml-orchestration': buildApp({
    department: 'NHS',
    euAIAct: 'Limited Risk',
    summary: 'Workforce automation for joiners, movers, leavers. Decisions assist HR but require human sign-off on access changes.',
    modelCard: {
      baseModel: 'Azure OpenAI (GPT-4o-mini)',
      architecture: 'Multi-agent orchestration · rule-engine hybrid',
      version: 'v3.1.0',
      lastFineTuned: '2026-04-02',
      trainingDataCutoff: '2026-Q1',
      evaluationFramework: 'Custom HR workflow benchmarks',
    },
    pillars: {
      fairness:        { score: 94, status: 'Excellent', metrics: [
        { label: 'Demographic parity in role transitions', value: 0.96, target: 0.90 },
        { label: 'Approval-rate parity (gender)',          value: 0.94, target: 0.90 },
        { label: 'Subgroup error variance',                value: '±3.2%', target: '<5%' },
        { label: 'Bias retest cadence',                    value: 'Monthly', target: 'Quarterly' },
      ]},
      transparency:    { score: 95, status: 'Excellent', metrics: [
        { label: 'Decision rationale exposed',             value: '100%', target: '100%' },
        { label: 'Workflow visualisation',                 value: 'Live graph', target: 'Required' },
        { label: 'Model card published',                   value: 'Yes',  target: 'Yes' },
        { label: 'API contract documented',                value: '100%', target: '100%' },
      ]},
      privacy:         { score: 96, status: 'Excellent', metrics: [
        { label: 'PII handled under role-based access',    value: 'RBAC + ABAC', target: 'RBAC' },
        { label: 'Field-level encryption',                 value: 'AES-256', target: 'Required' },
        { label: 'GDPR DPIA on file',                      value: 'Yes',  target: 'Yes' },
        { label: 'Data retention (days)',                  value: 90,    target: '≤180' },
      ]},
      safety:          { score: 93, status: 'Strong', metrics: [
        { label: 'Privilege escalation prevention',        value: 'Verified', target: 'Required' },
        { label: 'Test coverage on access logic',          value: '94%', target: '≥85%' },
        { label: 'Rollback capability',                    value: '<30s',target: '<2min' },
        { label: 'Active safety guardrails',               value: 9,     target: '≥6' },
      ]},
      accountability:  { score: 97, status: 'Excellent', metrics: [
        { label: 'Audit trail (immutable log)',            value: '100%', target: '100%' },
        { label: 'Owner: HR Digital Director',             value: 'Assigned', target: 'Required' },
        { label: 'Quarterly governance review',            value: 'On track', target: 'Required' },
        { label: 'Incident SLA (mins)',                    value: 10,    target: '≤30' },
      ]},
      reliability:     { score: 96, status: 'Excellent', metrics: [
        { label: 'Uptime (90d)',                           value: '99.95%', target: '≥99.9%' },
        { label: 'Auto-provisioning success rate',         value: '99.2%', target: '≥98%' },
        { label: 'Failed transitions (30d)',               value: 14,    target: '≤50' },
        { label: 'Regression suite pass rate',             value: '100%', target: '100%' },
      ]},
    },
    compliance: [
      { framework: 'NHS DSPT',                                       score: 100, status: 'compliant',   lastAudit: '2026-04-08' },
      { framework: 'GDS Service Standard',                            score: 95,  status: 'compliant',   lastAudit: '2026-03-19' },
      { framework: 'ISO 27001',                                       score: 98,  status: 'compliant',   lastAudit: '2026-02-22' },
      { framework: 'EU AI Act — Annex III (HR / Employment)',          score: 95,  status: 'compliant',   lastAudit: '2026-03-15' },
      { framework: 'Cyber Essentials Plus',                           score: 100, status: 'compliant',   lastAudit: '2026-04-30' },
      { framework: 'WCAG 2.2 AA',                                     score: 96,  status: 'compliant',   lastAudit: '2026-03-30' },
    ],
    humanOversight: {
      humanReviewRate: 100,
      overrideRate: 4.1,
      avgReviewTimeSec: 28,
      escalationsPerWeek: 12,
      clinicianApprovalRequired: false,
      modelInLoop: 'Manager approves every access change before commit',
    },
    dataLineage: [
      { source: 'Active Directory / Entra ID', purpose: 'Identity source of truth',     consent: 'Employment contract' },
      { source: 'ESR (Electronic Staff Record)', purpose: 'Role + grade lookups',       consent: 'Employment contract' },
      { source: 'ServiceNow ITSM',              purpose: 'Ticket orchestration',        consent: 'Operational' },
      { source: 'Audit log warehouse',          purpose: 'Forensics + compliance',      consent: 'Statutory retention' },
    ],
    incidents: [
      { date: '2026-04-30', severity: 'Low', title: 'Slow ESR sync (12 min lag) — vendor side',  resolved: true },
      { date: '2026-03-12', severity: 'Low', title: 'Email template typo (cosmetic)',             resolved: true },
    ],
    auditTrail: [
      { date: '2026-05-04', actor: 'HR Digital Board',     action: 'Quarterly governance review · Approved' },
      { date: '2026-04-08', actor: 'DSPT Auditor',         action: 'DSPT recertified — 100%' },
      { date: '2026-04-02', actor: 'MLOps Team',            action: 'Model v3.1.0 — improved Welsh translation' },
    ],
  }),

  'voluntary-redundancy': buildApp({
    department: 'NHS',
    euAIAct: 'High Risk',
    summary: 'Workforce transition modelling. Decisions affect employment outcomes — full HR and union oversight required.',
    pillars: {
      fairness:        { score: 97, status: 'Excellent', metrics: [
        { label: 'Demographic parity (age band)',     value: 0.98, target: 0.90 },
        { label: 'Equal opportunity (gender)',        value: 0.97, target: 0.90 },
        { label: 'Equal opportunity (ethnicity)',     value: 0.96, target: 0.90 },
        { label: 'Protected characteristic shielding', value: 'Active', target: 'Required' },
      ]},
      transparency:    { score: 96, status: 'Excellent', metrics: [
        { label: 'Decision factors disclosed to staff', value: 'Full',  target: 'Required' },
        { label: 'Severance calculation breakdown',    value: 'Itemised', target: 'Required' },
        { label: 'Appeal process documented',          value: 'Yes',  target: 'Yes' },
        { label: 'Union briefing materials',           value: 'Quarterly', target: 'Quarterly' },
      ]},
      privacy:         { score: 98, status: 'Excellent', metrics: [
        { label: 'Special category data segregation',  value: 'Yes',  target: 'Yes' },
        { label: 'GDPR DPIA — high-risk processing',   value: 'Approved', target: 'Required' },
        { label: 'Data retention (months)',            value: 36,    target: 'Statutory' },
        { label: 'Pseudonymisation in modelling',       value: 'Yes', target: 'Yes' },
      ]},
      safety:          { score: 95, status: 'Excellent', metrics: [
        { label: 'Modelling sanity-check tests',        value: '38 active', target: '≥20' },
        { label: 'Output bounds (severance £)',         value: 'Capped',    target: 'Required' },
        { label: 'Manual override required',            value: 'Yes',  target: 'Yes' },
        { label: 'Adversarial robustness',              value: 92,    target: 85 },
      ]},
      accountability:  { score: 98, status: 'Excellent', metrics: [
        { label: 'Audit trail (immutable)',             value: '100%', target: '100%' },
        { label: 'Trust HR Director sign-off',          value: 'Required per case', target: 'Required' },
        { label: 'Union joint review board',            value: 'Monthly', target: 'Quarterly' },
        { label: 'Equality Impact Assessment',           value: 'Published', target: 'Required' },
      ]},
      reliability:     { score: 95, status: 'Excellent', metrics: [
        { label: 'Uptime (90d)',                        value: '99.98%', target: '≥99.9%' },
        { label: 'Severance calculation accuracy',      value: '100%', target: '100%' },
        { label: 'Regression test pass rate',           value: '100%', target: '100%' },
        { label: 'Drift alerts (30d)',                  value: 0,     target: '≤1' },
      ]},
    },
    compliance: [
      { framework: 'NHS DSPT',                              score: 100, status: 'compliant', lastAudit: '2026-04-15' },
      { framework: 'EU AI Act — Annex III (Employment)',    score: 96,  status: 'compliant', lastAudit: '2026-04-01' },
      { framework: 'Equality Act 2010 — EIA published',     score: 100, status: 'compliant', lastAudit: '2026-03-22' },
      { framework: 'GDS Service Standard',                  score: 95,  status: 'compliant', lastAudit: '2026-02-19' },
      { framework: 'ACAS Code of Practice alignment',       score: 100, status: 'compliant', lastAudit: '2026-04-10' },
      { framework: 'WCAG 2.2 AA',                            score: 98,  status: 'compliant', lastAudit: '2026-03-20' },
    ],
    humanOversight: {
      humanReviewRate: 100,
      overrideRate: 22.6,
      avgReviewTimeSec: 240,
      escalationsPerWeek: 8,
      modelInLoop: 'Decision-support only — every case reviewed by HR + union rep',
    },
    dataLineage: [
      { source: 'ESR (Electronic Staff Record)',        purpose: 'Employment history',       consent: 'Employment contract' },
      { source: 'NHS Pensions data feed',                purpose: 'Pension impact modelling', consent: 'Statutory' },
      { source: 'Trust workforce planning database',    purpose: 'Eligibility cohort',       consent: 'Operational' },
    ],
    incidents: [
      { date: '2026-04-18', severity: 'Low', title: 'PDF rendering issue in severance summary',  resolved: true },
    ],
    auditTrail: [
      { date: '2026-05-06', actor: 'Joint Union Review Board', action: 'Monthly review · No issues raised' },
      { date: '2026-04-15', actor: 'DSPT Auditor',              action: 'DSPT renewed' },
      { date: '2026-04-01', actor: 'NHS England DPO',           action: 'High-risk DPIA reviewed and approved' },
    ],
  }),

  // ────────────────── MHCLG ──────────────────

  'planning-assistant-pro': buildApp({
    department: 'MHCLG',
    euAIAct: 'Limited Risk',
    summary: 'Decision-support for planning officers. Recommendations informed by policy; final decisions remain with planning committee.',
    pillars: {
      fairness:        { score: 93, status: 'Strong', metrics: [
        { label: 'Geographic outcome parity',          value: 0.94, target: 0.90 },
        { label: 'Application-type bias check',         value: 0.92, target: 0.90 },
        { label: 'Postcode-blind recommendation rate',  value: '88%',  target: '≥80%' },
        { label: 'Bias audit cadence',                  value: 'Quarterly', target: 'Quarterly' },
      ]},
      transparency:    { score: 96, status: 'Excellent', metrics: [
        { label: 'Citation of policy clause per decision', value: '100%', target: '100%' },
        { label: 'Recommendation rationale (markdown)',     value: 'Full', target: 'Required' },
        { label: 'Public-facing model card',                value: 'Published', target: 'Yes' },
        { label: 'Source documents linked',                  value: '100%', target: '100%' },
      ]},
      privacy:         { score: 94, status: 'Strong', metrics: [
        { label: 'Personal applicant data redaction',    value: '99.4%', target: '≥99%' },
        { label: 'GDPR DPIA',                              value: 'Yes',  target: 'Yes' },
        { label: 'Data retention (months)',                value: 60,    target: 'Statutory' },
        { label: 'Public consultation data segregation',  value: 'Yes',  target: 'Yes' },
      ]},
      safety:          { score: 92, status: 'Strong', metrics: [
        { label: 'Hallucination rate',                    value: '0.9%',  target: '<3%' },
        { label: 'Citation accuracy (RAG)',               value: '98.2%', target: '≥95%' },
        { label: 'Adversarial robustness',                value: 91,    target: 85 },
        { label: 'Active guardrails',                     value: 7,     target: '≥5' },
      ]},
      accountability:  { score: 95, status: 'Excellent', metrics: [
        { label: 'Audit trail',                           value: '100%', target: '100%' },
        { label: 'Owner: MHCLG Digital Director',         value: 'Assigned', target: 'Required' },
        { label: 'Local Authority feedback loop',         value: 'Active', target: 'Required' },
        { label: 'Incident SLA (mins)',                   value: 30,    target: '≤60' },
      ]},
      reliability:     { score: 94, status: 'Strong', metrics: [
        { label: 'Uptime (90d)',                          value: '99.91%', target: '≥99.9%' },
        { label: 'Recommendation alignment vs officer',    value: '91%',  target: '≥85%' },
        { label: 'Drift alerts (30d)',                    value: 1,     target: '≤3' },
        { label: 'Regression suite pass',                 value: '99.2%', target: '≥98%' },
      ]},
    },
    compliance: [
      { framework: 'GDS Service Standard',                  score: 96,  status: 'compliant',   lastAudit: '2026-04-02' },
      { framework: 'EU AI Act — Limited Risk transparency', score: 100, status: 'compliant',   lastAudit: '2026-03-12' },
      { framework: 'WCAG 2.2 AA',                            score: 98,  status: 'compliant',   lastAudit: '2026-03-25' },
      { framework: 'UK GDPR · DPIA on file',                 score: 95,  status: 'compliant',   lastAudit: '2026-02-28' },
      { framework: 'Local Government Information Charter',   score: 92,  status: 'in-progress', lastAudit: '2026-04-19' },
    ],
    humanOversight: {
      humanReviewRate: 100,
      overrideRate: 14.2,
      avgReviewTimeSec: 95,
      escalationsPerWeek: 26,
      modelInLoop: 'Officer reviews every recommendation before issuing planning decision',
    },
    dataLineage: [
      { source: 'NPPF (National Planning Policy Framework)', purpose: 'Policy retrieval',        consent: 'Public' },
      { source: 'Local Plan documents (per LA)',              purpose: 'Local policy retrieval',  consent: 'Public' },
      { source: 'Planning Inspectorate appeal decisions',     purpose: 'Precedent retrieval',     consent: 'Public' },
      { source: 'Submitted application packages',              purpose: 'Per-case analysis',       consent: 'Statutory' },
    ],
    incidents: [
      { date: '2026-04-26', severity: 'Medium', title: 'Stale Local Plan version cached for 4 hours', resolved: true },
      { date: '2026-03-14', severity: 'Low',    title: 'PDF parsing edge case on scanned drawings',    resolved: true },
    ],
    auditTrail: [
      { date: '2026-05-02', actor: 'MHCLG AI Governance Board', action: 'Quarterly review · Approved' },
      { date: '2026-04-02', actor: 'GDS Assessor',               action: 'Service Standard reassessment passed' },
      { date: '2026-03-12', actor: 'EU AI Act Lead',              action: 'Transparency disclosures published' },
    ],
  }),

  // ────────────────── Defra ──────────────────

  'defra-multi-agent-triage': buildApp({
    department: 'Defra',
    euAIAct: 'Limited Risk',
    summary: 'Multi-agent classification and routing of regulatory enquiries. Subject-matter experts review all routing decisions before action.',
    modelCard: {
      baseModel: 'Claude Sonnet 4.5 + supervisor agent',
      architecture: 'Multi-agent (triage · policy · drafting · QA)',
      version: 'v1.8.2',
      lastFineTuned: '2026-04-19',
      trainingDataCutoff: '2026-Q1',
      evaluationFramework: 'Custom Defra case-routing benchmark · 5,400 historical cases',
    },
    pillars: {
      fairness:        { score: 92, status: 'Strong', metrics: [
        { label: 'Geographic routing parity',           value: 0.95, target: 0.90 },
        { label: 'Sector-type routing parity',          value: 0.93, target: 0.90 },
        { label: 'Stakeholder feedback fairness',       value: 4.6,  target: '≥4.0' },
        { label: 'Bias retest cadence',                  value: 'Monthly', target: 'Quarterly' },
      ]},
      transparency:    { score: 94, status: 'Strong', metrics: [
        { label: 'Per-agent reasoning trace',           value: 'Full', target: 'Required' },
        { label: 'Routing rationale exposed',           value: '100%', target: '100%' },
        { label: 'Model card published',                value: 'Yes',  target: 'Yes' },
        { label: 'Workflow visualiser available',        value: 'Yes', target: 'Yes' },
      ]},
      privacy:         { score: 95, status: 'Excellent', metrics: [
        { label: 'PII redaction before LLM call',       value: '99.7%', target: '≥99%' },
        { label: 'GDPR DPIA',                            value: 'Yes',  target: 'Yes' },
        { label: 'EMEA-only inference',                 value: 'Yes',  target: 'Yes' },
        { label: 'Retention (case lifetime)',           value: '7 yrs',target: 'Statutory' },
      ]},
      safety:          { score: 91, status: 'Strong', metrics: [
        { label: 'Hallucination rate',                   value: '0.6%', target: '<2%' },
        { label: 'Inter-agent loop guardrails',          value: 'Max 8 hops', target: 'Required' },
        { label: 'Prompt injection defence',             value: 'Layered', target: 'Active' },
        { label: 'Active guardrails',                    value: 14,    target: '≥10' },
      ]},
      accountability:  { score: 94, status: 'Strong', metrics: [
        { label: 'Audit trail per agent step',           value: '100%', target: '100%' },
        { label: 'Owner: Defra Head of Digital',         value: 'Assigned', target: 'Required' },
        { label: 'Stakeholder review (LA partners)',      value: 'Monthly', target: 'Quarterly' },
        { label: 'Incident SLA (mins)',                  value: 20,    target: '≤60' },
      ]},
      reliability:     { score: 93, status: 'Strong', metrics: [
        { label: 'Uptime (90d)',                         value: '99.93%', target: '≥99.9%' },
        { label: 'Routing accuracy vs SME baseline',     value: '94.1%', target: '≥90%' },
        { label: 'Mean handle time reduction',           value: '−63%', target: '≥40%' },
        { label: 'Drift alerts (30d)',                   value: 1,     target: '≤3' },
      ]},
    },
    compliance: [
      { framework: 'GDS Service Standard',                  score: 95,  status: 'compliant',   lastAudit: '2026-04-22' },
      { framework: 'EU AI Act — Limited Risk transparency', score: 100, status: 'compliant',   lastAudit: '2026-03-30' },
      { framework: 'UK GDPR · DPIA on file',                 score: 96,  status: 'compliant',   lastAudit: '2026-02-12' },
      { framework: 'WCAG 2.2 AA',                            score: 95,  status: 'compliant',   lastAudit: '2026-03-18' },
      { framework: 'Defra Information Charter',              score: 93,  status: 'compliant',   lastAudit: '2026-04-08' },
    ],
    humanOversight: {
      humanReviewRate: 100,
      overrideRate: 9.7,
      avgReviewTimeSec: 55,
      escalationsPerWeek: 34,
      modelInLoop: 'Subject-matter expert reviews every routing decision before action',
    },
    dataLineage: [
      { source: 'Defra case management system',   purpose: 'Live cases',                 consent: 'Statutory' },
      { source: 'Environment Agency permit DB',    purpose: 'Permit lookups',             consent: 'Public' },
      { source: 'Statutory regulation corpus',     purpose: 'RAG knowledge base',         consent: 'Public' },
    ],
    incidents: [
      { date: '2026-04-29', severity: 'Low',    title: 'Supervisor-agent cycle hit hop-cap (recovered)',  resolved: true },
      { date: '2026-04-11', severity: 'Medium', title: 'Vector DB rebuild — 2-hour read-only mode',        resolved: true },
    ],
    auditTrail: [
      { date: '2026-05-05', actor: 'Defra Digital Board',  action: 'Performance review · Renewed mandate' },
      { date: '2026-04-22', actor: 'GDS Assessor',         action: 'Service Standard reassessment passed' },
      { date: '2026-04-19', actor: 'MLOps Team',            action: 'Model v1.8.2 — improved permit retrieval' },
    ],
  }),

  // ────────────────── Defence ──────────────────

  'compass-maintenance': buildApp({
    department: 'MOD',
    euAIAct: 'High Risk',
    summary: 'Aircraft maintenance optimisation. Safety-critical context — outputs validated by qualified maintenance engineers before scheduling commits.',
    modelCard: {
      baseModel: 'Custom · ensemble (LSTM + tabular)',
      architecture: 'Time-series forecasting · constraint solver hybrid',
      version: 'v4.2.0',
      lastFineTuned: '2026-04-25',
      trainingDataCutoff: '2026-Q2',
      evaluationFramework: 'MOD AI Assurance Framework · MAA RA 1900 series',
    },
    pillars: {
      fairness:        { score: 91, status: 'Strong', metrics: [
        { label: 'Cross-fleet allocation parity',        value: 0.94, target: 0.90 },
        { label: 'Squadron-level workload variance',     value: '±6%',target: '<10%' },
        { label: 'Equity in tasking review',              value: 'Monthly', target: 'Quarterly' },
        { label: 'Bias audit cadence',                    value: 'Quarterly', target: 'Quarterly' },
      ]},
      transparency:    { score: 93, status: 'Strong', metrics: [
        { label: 'Schedule-change rationale exposed',    value: '100%', target: '100%' },
        { label: 'Confidence intervals on forecasts',     value: 'Yes',  target: 'Yes' },
        { label: 'Model card (cleared release)',          value: 'OFFICIAL', target: 'Required' },
        { label: 'Decision-history graph',                value: 'Yes',  target: 'Yes' },
      ]},
      privacy:         { score: 96, status: 'Excellent', metrics: [
        { label: 'OFFICIAL-SENSITIVE data handling',     value: 'Compliant', target: 'Required' },
        { label: 'Personnel data segregation',           value: 'Yes',  target: 'Yes' },
        { label: 'Air-gapped training option',           value: 'Available', target: 'Available' },
        { label: 'Retention policy',                      value: 'MOD JSP 441', target: 'JSP 441' },
      ]},
      safety:          { score: 96, status: 'Excellent', metrics: [
        { label: 'Maintenance-engineer veto required',    value: 'Yes',  target: 'Yes' },
        { label: 'Safety case alignment (MAA)',          value: 'Approved', target: 'Required' },
        { label: 'Adversarial robustness',                value: 95,    target: 90 },
        { label: 'Active guardrails',                     value: 18,    target: '≥12' },
      ]},
      accountability:  { score: 96, status: 'Excellent', metrics: [
        { label: 'Audit trail (immutable, OFFICIAL)',     value: '100%', target: '100%' },
        { label: 'SRO: 2-Star MOD Capability',            value: 'Assigned', target: 'Required' },
        { label: 'MAA quarterly assurance review',        value: 'Active', target: 'Quarterly' },
        { label: 'Incident SLA (mins)',                   value: 15,    target: '≤30' },
      ]},
      reliability:     { score: 95, status: 'Excellent', metrics: [
        { label: 'Uptime (90d)',                          value: '99.96%', target: '≥99.9%' },
        { label: 'Schedule conflict rate',                value: '0.2%', target: '<2%' },
        { label: 'Forecast MAPE (parts demand)',          value: '7.4%', target: '<15%' },
        { label: 'Drift alerts (30d)',                    value: 0,     target: '≤2' },
      ]},
    },
    compliance: [
      { framework: 'MOD AI Adoption Policy (JSP 936)',     score: 98,  status: 'compliant',   lastAudit: '2026-04-30' },
      { framework: 'MAA RA 1900 (Airworthiness Mgmt)',     score: 96,  status: 'compliant',   lastAudit: '2026-03-28' },
      { framework: 'JSP 441 (Defence Records Mgmt)',        score: 100, status: 'compliant',   lastAudit: '2026-02-15' },
      { framework: 'NATO AI Strategy alignment',            score: 94,  status: 'compliant',   lastAudit: '2026-04-12' },
      { framework: 'EU AI Act — High Risk (Annex III)',     score: 95,  status: 'compliant',   lastAudit: '2026-03-22' },
      { framework: 'Cyber Essentials Plus',                 score: 100, status: 'compliant',   lastAudit: '2026-04-30' },
    ],
    humanOversight: {
      humanReviewRate: 100,
      overrideRate: 11.4,
      avgReviewTimeSec: 180,
      escalationsPerWeek: 19,
      modelInLoop: 'Qualified maintenance engineer signs off every schedule change',
    },
    dataLineage: [
      { source: 'Aircraft sortie logs',         purpose: 'Usage patterns',          consent: 'Operational' },
      { source: 'OEM parts catalogue (Airbus)',  purpose: 'Lifing & limits',         consent: 'Licensed' },
      { source: 'Squadron tasking schedule',     purpose: 'Demand forecasting',      consent: 'Operational' },
      { source: 'Maintenance history (LITS)',    purpose: 'Failure modelling',       consent: 'Operational' },
    ],
    incidents: [
      { date: '2026-04-09', severity: 'Low',    title: 'Parts catalogue sync delayed by 6 hours',  resolved: true },
      { date: '2026-02-21', severity: 'Medium', title: 'False-positive AOG alert on Tail #14 — fix shipped', resolved: true },
    ],
    auditTrail: [
      { date: '2026-05-07', actor: 'MAA Assurance Lead',     action: 'Quarterly assurance review · Renewed' },
      { date: '2026-04-30', actor: 'MOD CIO Office',          action: 'JSP 936 annual reattestation passed' },
      { date: '2026-04-25', actor: 'MLOps Team',              action: 'Model v4.2.0 — fleet-wide retraining' },
    ],
  }),

  'sentry-ai-a400': buildApp({
    department: 'MOD',
    euAIAct: 'High Risk',
    summary: 'Predictive maintenance for the RAF A400M fleet. Outputs feed a holographic ops centre — engineers act on forecasts within Maintenance Authority gates.',
    modelCard: {
      baseModel: 'Custom · physics-informed neural network',
      architecture: 'Time-series · sensor-fusion · anomaly detector',
      version: 'v2.7.3',
      lastFineTuned: '2026-05-01',
      trainingDataCutoff: '2026-Q2',
      evaluationFramework: 'RAF A400 Component Health Benchmarks · 14 component classes',
    },
    pillars: {
      fairness:        { score: 92, status: 'Strong', metrics: [
        { label: 'Component-class detection parity',     value: 0.96, target: 0.90 },
        { label: 'Tail-number bias (alert rate)',         value: '±4%',target: '<8%' },
        { label: 'Operating-environment robustness',      value: 'Hot/Cold/Desert', target: 'All theatres' },
        { label: 'Bias audit cadence',                    value: 'Monthly', target: 'Quarterly' },
      ]},
      transparency:    { score: 95, status: 'Excellent', metrics: [
        { label: 'Per-alert sensor evidence chain',       value: '100%', target: '100%' },
        { label: 'Confidence + prediction window',        value: 'Always shown', target: 'Required' },
        { label: 'Holographic decision-explainer',        value: 'Live', target: 'Available' },
        { label: 'Cleared model card (OFFICIAL)',         value: 'Published', target: 'Required' },
      ]},
      privacy:         { score: 97, status: 'Excellent', metrics: [
        { label: 'OFFICIAL-SENSITIVE handling',           value: 'Compliant', target: 'Required' },
        { label: 'Crew identity excluded from model',     value: 'Yes',  target: 'Yes' },
        { label: 'Air-gapped deployment option',          value: 'Available', target: 'Available' },
        { label: 'Retention (MOD JSP 441)',               value: 'Compliant', target: 'JSP 441' },
      ]},
      safety:          { score: 97, status: 'Excellent', metrics: [
        { label: 'Engineer veto on every action',         value: 'Required', target: 'Yes' },
        { label: 'Safety case (MAA-approved)',            value: 'Active',   target: 'Required' },
        { label: 'False-positive cost ceiling',           value: 'Tuned quarterly', target: 'Required' },
        { label: 'Active safety guardrails',              value: 22,    target: '≥15' },
      ]},
      accountability:  { score: 97, status: 'Excellent', metrics: [
        { label: 'Audit trail (immutable)',               value: '100%', target: '100%' },
        { label: 'SRO: AOC 2 Group',                      value: 'Assigned', target: 'Required' },
        { label: 'Quarterly fleet-airworthiness review',   value: 'Active', target: 'Quarterly' },
        { label: 'Incident escalation SLA (mins)',         value: 5,     target: '≤15' },
      ]},
      reliability:     { score: 96, status: 'Excellent', metrics: [
        { label: 'Uptime (90d)',                          value: '99.98%', target: '≥99.9%' },
        { label: 'True-positive rate (component faults)',  value: '93.6%', target: '≥85%' },
        { label: 'False-positive rate',                    value: '2.1%',  target: '<5%' },
        { label: 'Forecast horizon (days)',                value: 60,    target: '≥30' },
      ]},
    },
    compliance: [
      { framework: 'MOD AI Adoption Policy (JSP 936)',     score: 99,  status: 'compliant', lastAudit: '2026-04-29' },
      { framework: 'MAA RA 1900 (Airworthiness Mgmt)',     score: 98,  status: 'compliant', lastAudit: '2026-04-04' },
      { framework: 'EU AI Act — High Risk',                 score: 97,  status: 'compliant', lastAudit: '2026-03-12' },
      { framework: 'JSP 441 (Records Mgmt)',                score: 100, status: 'compliant', lastAudit: '2026-02-20' },
      { framework: 'Cyber Essentials Plus',                 score: 100, status: 'compliant', lastAudit: '2026-05-01' },
      { framework: 'NIST AI Risk Management Framework',     score: 94,  status: 'compliant', lastAudit: '2026-03-25' },
    ],
    humanOversight: {
      humanReviewRate: 100,
      overrideRate: 6.8,
      avgReviewTimeSec: 90,
      escalationsPerWeek: 12,
      modelInLoop: 'Maintenance authority engineer reviews + signs off every actioned alert',
    },
    dataLineage: [
      { source: 'A400 onboard sensor telemetry',  purpose: 'Component health features', consent: 'Operational' },
      { source: 'LITS maintenance history',        purpose: 'Failure ground-truth',     consent: 'Operational' },
      { source: 'Airbus Defence parts catalogue',  purpose: 'Lifing limits',             consent: 'Licensed' },
    ],
    incidents: [
      { date: '2026-04-17', severity: 'Low', title: 'Telemetry feed lag during exercise — 22 mins',  resolved: true },
    ],
    auditTrail: [
      { date: '2026-05-08', actor: 'MAA Assurance Lead',         action: 'Monthly fleet review · No findings' },
      { date: '2026-05-01', actor: 'MLOps Team',                  action: 'Model v2.7.3 — improved hot-bay performance' },
      { date: '2026-04-29', actor: 'MOD AI Ethics Committee',     action: 'Annual ethics review passed' },
    ],
  }),

  'mbt-warship-simulation': buildApp({
    department: 'MOD',
    euAIAct: 'Limited Risk',
    summary: 'Naval design simulation. Used at design-time only — outputs inform but do not drive build decisions.',
    modelCard: {
      baseModel: 'Hybrid CFD + ML surrogate',
      architecture: 'Computational fluid dynamics with neural surrogate accelerators',
      version: 'v1.4.0',
      lastFineTuned: '2026-04-09',
      trainingDataCutoff: '2026-Q1',
      evaluationFramework: 'BAE Systems Hull Performance Benchmarks',
    },
    pillars: {
      fairness:        { score: 90, status: 'Strong', metrics: [
        { label: 'Hull-class robustness',                value: 'Tested across 8 classes', target: '≥5' },
        { label: 'Sea-state representativeness',         value: 'Beaufort 0–9', target: 'Full range' },
        { label: 'Surrogate vs full-CFD parity',         value: 0.92, target: 0.85 },
        { label: 'Bias audit cadence',                    value: 'Quarterly', target: 'Quarterly' },
      ]},
      transparency:    { score: 96, status: 'Excellent', metrics: [
        { label: 'Per-simulation methodology export',     value: '100%', target: '100%' },
        { label: 'Force-vector visualisation',           value: 'Live 3D', target: 'Required' },
        { label: 'Confidence bands on surrogate output',  value: 'Yes',  target: 'Yes' },
        { label: 'Model card (cleared)',                  value: 'Published', target: 'Required' },
      ]},
      privacy:         { score: 95, status: 'Excellent', metrics: [
        { label: 'OFFICIAL-SENSITIVE handling',           value: 'Compliant', target: 'Required' },
        { label: 'IP segregation (BAE / customer)',      value: 'Tenant isolated', target: 'Required' },
        { label: 'Air-gapped option',                     value: 'Available', target: 'Available' },
        { label: 'Retention',                             value: 'Project lifetime', target: 'Defined' },
      ]},
      safety:          { score: 94, status: 'Strong', metrics: [
        { label: 'Surrogate fall-through to full CFD',   value: 'Auto on low-confidence', target: 'Required' },
        { label: 'Numerical stability monitors',         value: 'Active', target: 'Active' },
        { label: 'Adversarial input testing',             value: 91,    target: 85 },
        { label: 'Active guardrails',                    value: 11,    target: '≥8' },
      ]},
      accountability:  { score: 95, status: 'Excellent', metrics: [
        { label: 'Audit trail (per simulation)',          value: '100%', target: '100%' },
        { label: 'Owner: BAE Naval CTO',                  value: 'Assigned', target: 'Required' },
        { label: 'Engineering committee review',          value: 'Monthly', target: 'Quarterly' },
        { label: 'Incident SLA (mins)',                   value: 30,    target: '≤60' },
      ]},
      reliability:     { score: 95, status: 'Excellent', metrics: [
        { label: 'Uptime (90d)',                          value: '99.92%', target: '≥99.9%' },
        { label: 'Surrogate-vs-CFD agreement',           value: '93.4%', target: '≥90%' },
        { label: 'Speed-up vs full CFD',                  value: '47×',  target: '≥10×' },
        { label: 'Drift alerts (30d)',                    value: 0,     target: '≤2' },
      ]},
    },
    compliance: [
      { framework: 'MOD AI Adoption Policy (JSP 936)',     score: 96,  status: 'compliant', lastAudit: '2026-04-26' },
      { framework: 'EU AI Act — Limited Risk',              score: 100, status: 'compliant', lastAudit: '2026-03-08' },
      { framework: 'JSP 441 (Records Mgmt)',                score: 100, status: 'compliant', lastAudit: '2026-02-12' },
      { framework: 'ISO 27001',                             score: 98,  status: 'compliant', lastAudit: '2026-04-02' },
      { framework: 'BAE Engineering Quality (TickIT+)',     score: 94,  status: 'compliant', lastAudit: '2026-03-19' },
    ],
    humanOversight: {
      humanReviewRate: 100,
      overrideRate: 18.2,
      avgReviewTimeSec: 600,
      escalationsPerWeek: 4,
      modelInLoop: 'Naval architect reviews and validates every simulation output before design integration',
    },
    dataLineage: [
      { source: 'Vessel CAD model upload',         purpose: 'Geometry input',           consent: 'Customer-owned' },
      { source: 'Met Office sea-state archive',     purpose: 'Environmental forcing',    consent: 'Licensed' },
      { source: 'BAE hull performance archive',     purpose: 'Surrogate training',       consent: 'Internal' },
    ],
    incidents: [
      { date: '2026-04-21', severity: 'Low', title: 'GPU pool saturated — queue time spiked', resolved: true },
    ],
    auditTrail: [
      { date: '2026-05-03', actor: 'BAE Engineering Committee', action: 'Monthly review · Approved' },
      { date: '2026-04-26', actor: 'MOD CIO Office',             action: 'JSP 936 reattestation passed' },
      { date: '2026-04-09', actor: 'MLOps Team',                  action: 'Model v1.4.0 — added Beaufort 8–9 coverage' },
    ],
  }),

  // ────────────────── Transport ──────────────────

  'uk-transport-hub': buildApp({
    department: 'DfT',
    euAIAct: 'Limited Risk',
    summary: 'Real-time visibility of UK road and rail networks. Operational decisions remain with control-room staff — system surfaces signals, never auto-acts.',
    modelCard: {
      baseModel: 'Siemens Insights AI · ensemble',
      architecture: 'Stream processor + classifier ensemble',
      version: 'v5.0.1',
      lastFineTuned: '2026-04-15',
      trainingDataCutoff: '2026-Q2',
      evaluationFramework: 'Network Rail / National Highways operational benchmarks',
    },
    pillars: {
      fairness:        { score: 90, status: 'Strong', metrics: [
        { label: 'Regional coverage parity',             value: 0.93, target: 0.90 },
        { label: 'Mode parity (road/rail/cycle)',         value: 0.91, target: 0.88 },
        { label: 'Rural vs urban signal latency',         value: '+8%',target: '<15%' },
        { label: 'Bias audit cadence',                    value: 'Quarterly', target: 'Quarterly' },
      ]},
      transparency:    { score: 93, status: 'Strong', metrics: [
        { label: 'Per-incident provenance chain',         value: '100%', target: '100%' },
        { label: 'Signal-confidence shown to operator',   value: 'Yes',  target: 'Yes' },
        { label: 'Public-facing model card',              value: 'Published', target: 'Yes' },
        { label: 'Open data feed contract',               value: 'OGL v3', target: 'Open' },
      ]},
      privacy:         { score: 94, status: 'Strong', metrics: [
        { label: 'No PII processed',                      value: 'Confirmed', target: 'Required' },
        { label: 'ANPR data — segregated tier',           value: 'Yes',  target: 'Yes' },
        { label: 'GDPR DPIA',                              value: 'Yes',  target: 'Yes' },
        { label: 'Retention (operational)',                value: '90 days', target: '≤180' },
      ]},
      safety:          { score: 92, status: 'Strong', metrics: [
        { label: 'Operator-only action gates',            value: 'Required', target: 'Yes' },
        { label: 'Failover to dumb-mode',                 value: '<5s', target: '<30s' },
        { label: 'Adversarial robustness',                value: 89,    target: 85 },
        { label: 'Active guardrails',                     value: 9,     target: '≥6' },
      ]},
      accountability:  { score: 94, status: 'Strong', metrics: [
        { label: 'Audit trail (signal lineage)',           value: '100%', target: '100%' },
        { label: 'Owner: DfT Head of Network Operations',  value: 'Assigned', target: 'Required' },
        { label: 'Joint NR / NH governance board',         value: 'Quarterly', target: 'Quarterly' },
        { label: 'Incident SLA (mins)',                    value: 10,    target: '≤30' },
      ]},
      reliability:     { score: 94, status: 'Strong', metrics: [
        { label: 'Uptime (90d)',                          value: '99.95%', target: '≥99.9%' },
        { label: 'Signal precision (validated)',           value: '92.4%', target: '≥88%' },
        { label: 'Median time-to-signal',                  value: '12s', target: '<30s' },
        { label: 'Drift alerts (30d)',                    value: 1,     target: '≤3' },
      ]},
    },
    compliance: [
      { framework: 'GDS Service Standard',                  score: 96,  status: 'compliant', lastAudit: '2026-04-18' },
      { framework: 'EU AI Act — Limited Risk',              score: 100, status: 'compliant', lastAudit: '2026-03-22' },
      { framework: 'UK GDPR · DPIA',                         score: 95,  status: 'compliant', lastAudit: '2026-03-04' },
      { framework: 'WCAG 2.2 AA',                            score: 95,  status: 'compliant', lastAudit: '2026-03-30' },
      { framework: 'Open Government Licence v3',             score: 100, status: 'compliant', lastAudit: '2026-02-26' },
      { framework: 'Network Rail Cyber Compliance',          score: 96,  status: 'compliant', lastAudit: '2026-04-12' },
    ],
    humanOversight: {
      humanReviewRate: 100,
      overrideRate: 5.4,
      avgReviewTimeSec: 35,
      escalationsPerWeek: 78,
      modelInLoop: 'Control-room operator confirms every actioned alert · system never acts autonomously',
    },
    dataLineage: [
      { source: 'National Highways NTIS feed',     purpose: 'Road network state',       consent: 'Operational' },
      { source: 'Network Rail TRUST',              purpose: 'Rail performance state',    consent: 'Operational' },
      { source: 'Met Office DataPoint',            purpose: 'Weather risk overlay',      consent: 'Licensed' },
      { source: 'TfL Open Data',                    purpose: 'London corridor overlay',  consent: 'OGL v3' },
    ],
    incidents: [
      { date: '2026-04-29', severity: 'Medium', title: 'NTIS feed gap — 19 min · failed over to cache',  resolved: true },
      { date: '2026-04-02', severity: 'Low',    title: 'Tile-server warm-up after deploy',                resolved: true },
    ],
    auditTrail: [
      { date: '2026-05-06', actor: 'DfT Network Ops Board',     action: 'Quarterly governance review · Approved' },
      { date: '2026-04-18', actor: 'GDS Assessor',               action: 'Service Standard reassessment passed' },
      { date: '2026-04-15', actor: 'MLOps Team',                  action: 'Model v5.0.1 — improved cycle-network coverage' },
    ],
  }),

};

// Helper — list of available apps for the dropdown, grouped by department
export const availableAppsForRAI = [
  { id: 'virtual-clinician',         name: 'Virtual Clinician',                          department: 'NHS' },
  { id: 'jml-orchestration',          name: 'JML Orchestration',                          department: 'NHS' },
  { id: 'voluntary-redundancy',       name: 'Leavers Voluntary Redundancy Programme',     department: 'NHS' },
  { id: 'planning-assistant-pro',     name: 'Augmented Planning Decisions',               department: 'MHCLG' },
  { id: 'defra-multi-agent-triage',   name: 'Defra Multi-Agent Triage System',            department: 'Defra' },
  { id: 'compass-maintenance',        name: 'COMPASS',                                    department: 'MOD' },
  { id: 'sentry-ai-a400',             name: 'Sentry AI — A400 Fleet Monitor',             department: 'MOD' },
  { id: 'mbt-warship-simulation',     name: 'MBT Naval Design Simulator',                 department: 'MOD' },
  { id: 'uk-transport-hub',           name: 'UK Transport Hub',                           department: 'DfT' },
];
