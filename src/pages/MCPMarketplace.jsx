import { useState } from 'react';
import {
  Shield, Workflow, Code, FileCode,
  Users, Building2, Activity, Database, Server, MessageSquare,
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SearchBar from '../components/SearchBar';
import MCPCard from '../components/MCPCard';
import { mcpData } from '../data/mcpData';

const MCPMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all',              label: 'All MCPs',                  icon: Workflow   },
    { id: 'crm-sales',        label: 'CRM & Sales',               icon: Users      },
    { id: 'erp-finance',      label: 'ERP & Finance',             icon: Building2  },
    { id: 'itsm-ops',         label: 'ITSM & Ops',                icon: Activity   },
    { id: 'data-analytics',   label: 'Data & Analytics',          icon: Database   },
    { id: 'security-identity',label: 'Security & Identity',       icon: Shield     },
    { id: 'devops-infra',     label: 'DevOps & Infrastructure',   icon: Server     },
    { id: 'collaboration',    label: 'Collaboration',             icon: MessageSquare },
  ];

  const categoryMap = {
    'crm-sales':         'CRM & Sales',
    'erp-finance':       'ERP & Finance',
    'itsm-ops':          'ITSM & Ops',
    'data-analytics':    'Data & Analytics',
    'security-identity': 'Security & Identity',
    'devops-infra':      'DevOps & Infrastructure',
    'collaboration':     'Collaboration',
  };

  const filteredMCPs = mcpData.filter(mcp => {
    if (
      searchTerm &&
      !mcp.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !mcp.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !mcp.organization.toLowerCase().includes(searchTerm.toLowerCase())
    ) return false;
    if (activeCategory !== 'all' && mcp.category !== categoryMap[activeCategory]) return false;
    return true;
  });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-primary)' }}>
      <PageHeader
        eyebrow="Model Context Protocol"
        icon={Workflow}
        title="Enterprise MCP Marketplace"
        highlight="MCP Marketplace"
        subtitle="Extend your AI agents with enterprise-grade integrations from Salesforce, ServiceNow, SAP, GitHub, Snowflake, and 20+ more — governed, auditable, and production-ready."
        pills={[
          { label: 'Security Tested' },
          { label: 'Enterprise Grade' },
          { label: 'Open Standards' },
        ]}
      />

      {/* Stats row directly below header */}
      <div style={{ padding: '24px var(--section-padding-x) 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {[
            ['25+',  'Enterprise MCPs'],
            ['8',    'Vendor Categories'],
            ['4.8',  'Avg Vendor Rating'],
            ['15+',  'AI Models Supported'],
          ].map(([num, label]) => (
            <div key={label} className="card" style={{ padding: '20px 24px' }}>
              <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1 }}>{num}</p>
              <p style={{ fontSize: 'var(--text-meta)', color: 'var(--color-text-muted)', marginTop: 4 }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '32px var(--section-padding-x)' }}>
        <div style={{ marginBottom: 20 }}>
          <SearchBar
            placeholder="Search by name, vendor, or description…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 32 }}>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`btn ${activeCategory === category.id ? 'btn-accent' : 'btn-ghost'}`}
              style={{ padding: '5px 10px', fontSize: 11.5, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 4 }}
            >
              <category.icon size={12} />
              {category.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p style={{ fontSize: 13, color: 'var(--color-text-muted)', marginBottom: 20 }}>
          Showing {filteredMCPs.length} of {mcpData.length} enterprise MCP servers
        </p>

        {/* MCP grid */}
        <div className="marketplace-grid" style={{ marginBottom: 48 }}>
          {filteredMCPs.map(mcp => <MCPCard key={mcp.id} mcp={mcp} />)}
        </div>
        {filteredMCPs.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <p style={{ color: 'var(--color-text-muted)' }}>No MCPs match your current search.</p>
          </div>
        )}

        {/* Resource cards */}
        <div className="grid grid-cols-3 gap-6">
          {[
            { icon: FileCode, label: 'API Documentation',  desc: 'Comprehensive API reference for all enterprise MCP protocols',    action: 'View Docs'       },
            { icon: Code,     label: 'SDK Downloads',       desc: 'Official SDKs for Python, Node.js, Java, and .NET',              action: 'Get SDKs'        },
            { icon: FileCode, label: 'Sample Code',         desc: 'Ready-to-use code examples for Salesforce, ServiceNow, and SAP', action: 'Browse Examples' },
          ].map(({ icon: Icon, label, desc, action }) => (
            <div key={label} className="card reveal" style={{ cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div className="app-card-icon"><Icon size={20} /></div>
                <button style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-accent)', background: 'none', border: 'none', cursor: 'pointer' }}>
                  {action} →
                </button>
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 6 }}>{label}</h3>
              <p style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MCPMarketplace;
