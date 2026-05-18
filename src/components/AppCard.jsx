import { ArrowUpRight } from 'lucide-react';

const AppCard = ({ app }) => {
  const isComingSoon = !!app.comingSoon;
  const href = app.externalUrl || app.route || null;

  const cardContent = (
    <>
      <div className="app-card-header">
        <div className="app-card-icon">{app.icon && <app.icon size={20} />}</div>
        <div className="app-card-heading">
          <h3 className="app-card-title">{app.name}</h3>
          <span className="app-card-sub">{app.category}</span>
        </div>
        {!isComingSoon && <ArrowUpRight size={16} className="app-card-arrow" aria-hidden />}
      </div>

      <p className="app-card-desc">{app.description}</p>

      <div className="app-card-meta">
        <span className="app-card-vendor">{app.provider}</span>
        <span
          className={`app-card-pill ${isComingSoon ? 'is-soon' : 'is-live'}`}
        >
          {isComingSoon ? 'Coming soon' : 'Available'}
        </span>
      </div>
    </>
  );

  const sharedProps = {
    className: `app-card reveal${isComingSoon ? ' is-coming-soon' : ''}`,
    'aria-disabled': isComingSoon || undefined,
  };

  if (isComingSoon || !href) {
    return <div {...sharedProps}>{cardContent}</div>;
  }

  const external = !!app.externalUrl;
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      {...sharedProps}
    >
      {cardContent}
    </a>
  );
};

export default AppCard;
