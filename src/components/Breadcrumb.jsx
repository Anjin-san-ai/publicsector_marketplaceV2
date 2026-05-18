import { Home, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => (
  <nav style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, marginBottom: 20 }}>
    <Link
      to="/"
      style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
      onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent)')}
      onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
    >
      <Home size={14} />
      Home
    </Link>
    {items.map((item, i) => (
      <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <ChevronRight size={12} style={{ color: 'var(--color-text-muted)' }} />
        {item.href ? (
          <Link
            to={item.href}
            style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}
          >
            {item.label}
          </Link>
        ) : (
          <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>
            {item.label}
          </span>
        )}
      </span>
    ))}
  </nav>
);

export default Breadcrumb;
