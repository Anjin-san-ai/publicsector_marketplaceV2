import { Shield } from 'lucide-react';

const MCPCard = ({ mcp }) => {
  const isComingSoon = !!mcp.comingSoon;
  const href = mcp.externalUrl || null;

  const front = (
    <div className="app-card-face app-card-front">
      <div className="app-card-icon">{mcp.icon && <mcp.icon size={20} />}</div>
      <span className="app-card-eyebrow">{mcp.category}</span>
      <h3 className="app-card-title">{mcp.name}</h3>
      <div className="app-card-front-foot">
        <span className="app-card-hint">Hover for details ▸</span>
        {isComingSoon ? (
          <span className="app-card-pill is-soon">Coming soon</span>
        ) : mcp.securityTested ? (
          <span className="app-card-pill is-secure">
            <Shield size={11} /> Security tested
          </span>
        ) : (
          <span className="app-card-pill is-live">Available</span>
        )}
      </div>
    </div>
  );

  const back = (
    <div className="app-card-face app-card-back" aria-hidden="true">
      <div className="app-card-back-head">
        <h3 className="app-card-back-title">{mcp.name}</h3>
        <span className="app-card-back-eyebrow">{mcp.category}</span>
      </div>
      <p className="app-card-back-desc">{mcp.description}</p>
      <div className="app-card-back-foot">
        <span>{mcp.organization}</span>
        <span className="app-card-back-foot-cta">
          {isComingSoon
            ? 'Coming soon'
            : mcp.securityTested
              ? 'Security tested ▸'
              : 'Tap to open ▸'}
        </span>
      </div>
    </div>
  );

  const flip = (
    <div className="app-card-flip">
      {front}
      {back}
    </div>
  );

  const className = `app-card reveal${isComingSoon ? ' is-coming-soon' : ''}`;

  if (href && !isComingSoon) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {flip}
      </a>
    );
  }

  return (
    <div className={className} aria-disabled={isComingSoon || undefined}>
      {flip}
    </div>
  );
};

export default MCPCard;
