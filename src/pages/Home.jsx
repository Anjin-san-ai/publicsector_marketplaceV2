import { Store } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import AIAcceleratorHub from '../components/AIAcceleratorHub';

const Home = () => (
  <div style={{ minHeight: '100vh', background: 'var(--color-bg-primary)' }}>
    <PageHeader
      eyebrow="UK Public Sector"
      icon={Store}
      title="AI Marketplace"
      highlight="Marketplace"
      subtitle="Discover, deploy, and manage trusted AI solutions designed specifically for UK government departments. Secure, compliant, and responsible by design."
      pills={[
        { label: 'GDS Compliant', tone: 'accent' },
        { label: 'WCAG 2.1 AA' },
        { label: 'UK AI Regulation' },
      ]}
    />

    <AIAcceleratorHub />
  </div>
);

export default Home;
