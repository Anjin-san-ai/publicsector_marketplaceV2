import Breadcrumb from './Breadcrumb';

/**
 * Render a heading string, colouring an optional `highlight` substring blue.
 * Example: title="NHS England", highlight="England" → "NHS " + <span class="keyword-blue">England</span>
 */
const renderTitle = (title, highlight) => {
  if (!highlight || typeof title !== 'string') return title;
  const idx = title.toLowerCase().indexOf(highlight.toLowerCase());
  if (idx === -1) return title;
  return (
    <>
      {title.slice(0, idx)}
      <span className="keyword-blue">{title.slice(idx, idx + highlight.length)}</span>
      {title.slice(idx + highlight.length)}
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
 *   highlight  : optional substring within title to colour blue
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
