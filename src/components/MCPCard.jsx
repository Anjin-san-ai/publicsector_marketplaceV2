import { ArrowUpRight, Shield, Github } from 'lucide-react';

const MCPCard = ({ mcp }) => {
  const isComingSoon = !!mcp.comingSoon;
  const href = mcp.externalUrl || null;
  const isGithub = href && href.includes('github.com');

  const content = (
    <>
      <div className="app-card-header">
        <div className="app-card-icon">{mcp.icon && <mcp.icon size={20} />}</div>
        <div className="app-card-heading">
          <h3 className="app-card-title">{mcp.name}</h3>
          <span className="app-card-sub">{mcp.organization}</span>
        </div>
        {href && !isComingSoon && (
          isGithub
            ? <Github size={16} className="app-card-arrow" aria-hidden />
            : <ArrowUpRight size={16} className="app-card-arrow" aria-hidden />
        )}
      </div>

      <p className="app-card-desc">{mcp.description}</p>

      <div className="app-card-meta">
        <span className="app-card-vendor">{mcp.category}</span>
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
    </>
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
        {content}
      </a>
    );
  }

  return (
    <div className={className} aria-disabled={isComingSoon || undefined}>
      {content}
    </div>
  );
};

export default MCPCard;
