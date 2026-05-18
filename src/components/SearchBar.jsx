import { Search } from 'lucide-react';

const SearchBar = ({ placeholder = "Search...", value, onChange, className = "" }) => (
  <div className={`relative ${className}`} style={{ flex: 1 }}>
    <Search
      size={16}
      style={{
        position: 'absolute',
        left: 14,
        top: '50%',
        transform: 'translateY(-50%)',
        color: 'var(--color-text-muted)',
        pointerEvents: 'none',
      }}
    />
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        width: '100%',
        padding: '11px 16px 11px 40px',
        border: '1px solid var(--color-border-strong)',
        borderRadius: 'var(--radius-card)',
        background: 'var(--color-bg-surface)',
        color: 'var(--color-text-primary)',
        fontSize: 14,
        fontFamily: 'var(--font-body)',
        outline: 'none',
        transition: 'border-color 0.2s',
      }}
      onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
      onBlur={e => (e.target.style.borderColor = 'var(--color-border-strong)')}
    />
  </div>
);

export default SearchBar;
