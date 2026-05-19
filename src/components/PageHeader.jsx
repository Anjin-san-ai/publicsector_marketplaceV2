import { useEffect, useState } from 'react';
import Breadcrumb from './Breadcrumb';

/**
 * Type out `text` character-by-character. A hidden ghost copy reserves the
 * final width so surrounding heading text doesn't shift while typing.
 * Respects prefers-reduced-motion (renders the full string immediately).
 */
const TypewriterText = ({ text }) => {
  const [count, setCount] = useState(() => {
    if (typeof window === 'undefined') return text.length;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? text.length
      : 0;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(text.length);
      return;
    }
    setCount(0);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= text.length) window.clearInterval(id);
    }, 95);
    return () => window.clearInterval(id);
  }, [text]);

  return (
    <span className="typewriter" aria-label={text}>
      <span className="typewriter-ghost" aria-hidden="true">{text}</span>
      <span className="typewriter-visible" aria-hidden="true">
        {text.slice(0, count)}
        <span className="typewriter-cursor" />
      </span>
    </span>
  );
};

/**
 * Render a heading. The portion matching `highlight` is animated as a
 * typewriter and tinted with the accent color; the rest stays static.
 */
const renderTitle = (title, highlight) => {
  if (!highlight || typeof title !== 'string') return title;
  const idx = title.toLowerCase().indexOf(highlight.toLowerCase());
  if (idx === -1) return title;
  const before = title.slice(0, idx);
  const match = title.slice(idx, idx + highlight.length);
  const after = title.slice(idx + highlight.length);
  return (
    <>
      {before}
      <TypewriterText text={match} />
      {after}
    </>
  );
};

/**
 * Shared page-header component used by every department / dashboard / marketplace page.
 *
 * Props:
 *   breadcrumb : array of { label, href? } — passed to <Breadcrumb>
 *   eyebrow    : optional small uppercase pill text
 *   icon       : optional Lucide icon component
 *   title      : page H1 (string or ReactNode)
 *   highlight  : optional substring within title to animate as typewriter
 *   subtitle   : optional intro paragraph
 *   pills      : optional array of { label, tone?: 'accent'|'ghost' }
 */
const PageHeader = ({
  breadcrumb,
  eyebrow,
  icon: Icon,
  title,
  highlight,
  subtitle,
  pills,
}) => (
  <header className="page-header">
    <div className="page-header-inner">
      {breadcrumb && breadcrumb.length > 0 && <Breadcrumb items={breadcrumb} />}

      {eyebrow && <span className="page-header-eyebrow">{eyebrow}</span>}

      <div className="page-header-title-row">
        {Icon && (
          <div className="page-header-icon">
            <Icon size={26} />
          </div>
        )}
        <h1 className="page-header-title">{renderTitle(title, highlight)}</h1>
      </div>

      {subtitle && <p className="page-header-subtitle">{subtitle}</p>}

      {pills && pills.length > 0 && (
        <div className="page-header-pills">
          {pills.map((p) => (
            <span
              key={p.label}
              className={`page-header-pill ${p.tone === 'accent' ? 'accent' : ''}`}
            >
              {p.label}
            </span>
          ))}
        </div>
      )}
    </div>
  </header>
);

export default PageHeader;
