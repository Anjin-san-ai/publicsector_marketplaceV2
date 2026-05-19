import { Compass, Layers, Rocket, Cpu, Hammer, FlaskConical } from 'lucide-react';

const offerings = [
  {
    icon: Compass,
    eyebrow: 'Service',
    title: 'AI Operating Model Advisory',
    body: 'Scalable, responsible AI operating models aligning strategy, governance, skills and technology.',
  },
  {
    icon: Rocket,
    eyebrow: 'Service',
    title: 'Rapid Prototyping',
    body: 'Forward Deployed Engineers turn priority use cases into working prototypes to validate value fast.',
  },
  {
    icon: Layers,
    eyebrow: 'Service',
    title: 'Scaling AI Applications',
    body: 'Industrialise proven AI solutions — secure, governed and integrated across systems.',
  },
  {
    icon: Cpu,
    eyebrow: 'Platform',
    title: 'Neuro® AI Multi-Agent Orchestrator',
    body: 'Open-source framework to build and deploy interoperable multi-agent systems in hours.',
  },
  {
    icon: Hammer,
    eyebrow: 'Framework',
    title: 'Agent Foundry',
    body: 'Public sector framework to design, deploy and scale autonomous agents with modular components.',
  },
  {
    icon: FlaskConical,
    eyebrow: 'Environment',
    title: 'Sandbox-as-a-Service',
    body: 'Secure, governed environment to explore and validate frontier AI models, with Anthropic.',
  },
];

const HubCard = ({ icon: Icon, eyebrow, title, body }) => (
  <article className="hub-card reveal">
    <div className="hub-card-flip">
      <div className="hub-card-face hub-card-front">
        <div className="hub-card-icon"><Icon size={20} /></div>
        <span className="hub-card-eyebrow">{eyebrow}</span>
        <h3 className="hub-card-title">{title}</h3>
        <span className="hub-card-hint">Hover for details ▸</span>
      </div>
      <div className="hub-card-face hub-card-back" aria-hidden="true">
        <h3 className="hub-card-back-title">{title}</h3>
        <p className="hub-card-back-body">{body}</p>
      </div>
    </div>
  </article>
);

const AIAcceleratorHub = () => (
  <section className="section-light">
    <div className="page-container">
      <div className="section-heading reveal">
        <span className="section-eyebrow">UK Public Sector AI Accelerator Hub</span>
        <h2 className="section-title">
          Accelerating responsible AI adoption{' '}
          <span className="keyword-blue">across government</span>
        </h2>
        <p className="section-subtitle">
          Services, tools and accelerators purpose-built for UK public sector AI adoption.
        </p>
      </div>
      <div className="hub-grid-3">
        {offerings.map((o) => <HubCard key={o.title} {...o} />)}
      </div>
    </div>
  </section>
);

export default AIAcceleratorHub;
