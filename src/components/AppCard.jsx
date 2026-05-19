const AppCard = ({ app }) => {
  const isComingSoon = !!app.comingSoon;
  const href = app.externalUrl || app.route || null;

  const front = (
    <div className="app-card-face app-card-front">
      <div className="app-card-icon">{app.icon && <app.icon size={20} />}</div>
      <span className="app-card-eyebrow">{app.category}</span>
      <h3 className="app-card-title">{app.name}</h3>
      <div className="app-card-front-foot">
        <span className="app-card-hint">Hover for details ▸</span>
        <span className={`app-card-pill ${isComingSoon ? 'is-soon' : 'is-live'}`}>
          {isComingSoon ? 'Coming soon' : 'Available'}
        </span>
      </div>
    </div>
  );

  const back = (
    <div className="app-card-face app-card-back" aria-hidden="true">
      <div className="app-card-back-head">
        <h3 className="app-card-back-title">{app.name}</h3>
        <span className="app-card-back-eyebrow">{app.category}</span>
      </div>
      <p className="app-card-back-desc">{app.description}</p>
      <div className="app-card-back-foot">
        <span>{app.provider}</span>
        <span className="app-card-back-foot-cta">
          {isComingSoon ? 'Coming soon' : 'Tap to open ▸'}
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

  const sharedProps = {
    className: `app-card reveal${isComingSoon ? ' is-coming-soon' : ''}`,
    'aria-disabled': isComingSoon || undefined,
  };

  if (isComingSoon || !href) {
    return <div {...sharedProps}>{flip}</div>;
  }

  const external = !!app.externalUrl;
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      {...sharedProps}
    >
      {flip}
    </a>
  );
};

export default AppCard;
