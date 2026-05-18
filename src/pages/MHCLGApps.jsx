import { useState } from 'react';
import { Building2, Grid, List } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SearchBar from '../components/SearchBar';
import AppCard from '../components/AppCard';
import { mhclgApps } from '../data/mhclgAppsData';

const MHCLGApps = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const filteredApps = mhclgApps.filter(app => {
    if (searchTerm && !app.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !app.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-primary)' }}>
      <PageHeader
        eyebrow="Department"
        icon={Building2}
        title="Ministry of Housing, Communities & Local Government"
        highlight="Local Government"
        subtitle="AI solutions for planning applications, housing allocation, local government operations, and community services — vetted for compliance with UK public sector standards."
        pills={[
          { label: `${mhclgApps.length} Apps Available`, tone: 'accent' },
          { label: 'GDS Compliant' },
        ]}
      />

      {/* Main Content */}
      <div style={{ padding: '32px var(--section-padding-x)' }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
            <SearchBar placeholder="Search AI apps..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ flex: 1 }} />
            <div style={{ display: 'flex', gap: 8 }}>
              <select style={{ padding: '10px 16px', border: '1px solid var(--color-border-strong)', borderRadius: 'var(--radius-card)', background: 'var(--color-bg-surface)', color: 'var(--color-text-primary)', fontSize: 13, fontFamily: 'var(--font-body)' }}>
                <option>Relevance</option><option>Most Popular</option><option>Highest Rated</option><option>Newest</option>
              </select>
              <button onClick={() => setViewMode('grid')} className={`btn ${viewMode === 'grid' ? 'btn-accent' : 'btn-ghost'}`} style={{ padding: '10px 14px' }}><Grid size={16} /></button>
              <button onClick={() => setViewMode('list')} className={`btn ${viewMode === 'list' ? 'btn-accent' : 'btn-ghost'}`} style={{ padding: '10px 14px' }}><List size={16} /></button>
            </div>
          </div>
          <p style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>Showing {filteredApps.length} of {mhclgApps.length} apps</p>
        </div>
        <div className={viewMode === 'grid' ? 'marketplace-grid' : 'space-y-4'}>
          {filteredApps.map(app => <AppCard key={app.id} app={app} hideDeploy />)}
        </div>
        {filteredApps.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <p style={{ color: 'var(--color-text-muted)' }}>No apps match your current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MHCLGApps;
