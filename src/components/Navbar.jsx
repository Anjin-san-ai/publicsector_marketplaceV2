import { useEffect, useState } from 'react';
import { Sun, Moon, Sunset, Home, Activity, Building2, Shield, Store, Wrench, ExternalLink, Leaf, Flag, Train, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import config from '../config';
const cognizantLogo = '/cognizant-logo.png';

const sidebarTabs = [
  { name: 'Home',           icon: Home,      path: '/' },
  { name: 'NHS Apps',       icon: Activity,  path: '/nhs-apps' },
  { name: 'MHCLG Apps',     icon: Building2, path: '/mhclg-apps' },
  { name: 'Defra Apps',     icon: Leaf,      path: '/defra-apps' },
  { name: 'Defence Apps',   icon: Flag,      path: '/defence-apps' },
  { name: 'Transport Apps', icon: Train,     path: '/transport-apps' },
];

const topbarTabs = [
  { name: 'Responsible AI',  icon: Shield, path: '/responsible-ai' },
  { name: 'MCP Marketplace', icon: Store,  path: '/mcp-marketplace' },
];

const themeButtons = [
  { id: 'warm',  Icon: Sunset, title: 'Warm mode'  },
  { id: 'white', Icon: Sun,    title: 'Light mode' },
  { id: 'dark',  Icon: Moon,   title: 'Dark mode'  },
];

const SIDEBAR_STORAGE_KEY = 'marketplace.sidebar.collapsed';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(SIDEBAR_STORAGE_KEY) === '1';
  });

  useEffect(() => {
    document.body.classList.toggle('sidebar-collapsed', collapsed);
    window.localStorage.setItem(SIDEBAR_STORAGE_KEY, collapsed ? '1' : '0');
  }, [collapsed]);

  return (
    <>
      {/* ── Top bar ─────────────────────────────────────── */}
      <div className="navbar-topbar">
        <a href="/" className="navbar-brand">
          <img src={cognizantLogo} alt="Cognizant" className="navbar-brand-logo" />
          <span className="navbar-brand-text">
            <span className="navbar-brand-line">UK Public Sector</span>
            <span className="navbar-brand-line">AI Marketplace</span>
          </span>
          <span className="beta-badge" style={{ marginLeft: 6 }}>BETA V 2.1</span>
        </a>

        <div className="navbar-topbar-actions">
          <ul className="navbar-topbar-tabs" aria-label="Utility navigation">
            {topbarTabs.map((tab) => (
              <li key={tab.name}>
                <NavLink
                  to={tab.path}
                  className={({ isActive }) => isActive ? 'active' : ''}
                >
                  <tab.icon size={14} />
                  {tab.name}
                </NavLink>
              </li>
            ))}
            <li>
              <a
                href={config.AGENT_BUILDER_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Wrench size={14} />
                Agent Builder
                <ExternalLink size={11} style={{ opacity: 0.6 }} />
              </a>
            </li>
          </ul>

          <div className="navbar-topbar-divider" aria-hidden="true" />

          {themeButtons.map(({ id, Icon, title }) => (
            <button
              key={id}
              className={`navbar-icon-btn${theme === id ? ' active' : ''}`}
              onClick={() => setTheme(id)}
              title={title}
              aria-label={title}
              aria-pressed={theme === id}
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
      </div>

      {/* ── Left vertical sidebar ───────────────────────── */}
      <aside className={`navbar-sidebar${collapsed ? ' is-collapsed' : ''}`} aria-label="Main navigation">
        <button
          type="button"
          className="navbar-sidebar-toggle"
          onClick={() => setCollapsed((c) => !c)}
          aria-pressed={collapsed}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </button>

        <ul className="navbar-sidebar-links">
          {sidebarTabs.map((tab) => (
            <li key={tab.name}>
              <NavLink
                to={tab.path}
                end={tab.path === '/'}
                className={({ isActive }) => isActive ? 'active' : ''}
                title={collapsed ? tab.name : undefined}
              >
                <tab.icon size={16} />
                <span className="navbar-sidebar-label">{tab.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Navbar;
