import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Eagerly load Home (first paint should not wait on chunks)
import Home from './pages/Home';

// Lazy-load every other route — each becomes its own chunk
const MHCLGApps        = lazy(() => import('./pages/MHCLGApps'));
const NHSApps          = lazy(() => import('./pages/NHSApps'));
const DefraApps        = lazy(() => import('./pages/DefraApps'));
const DefenceApps      = lazy(() => import('./pages/DefenceApps'));
const TransportApps    = lazy(() => import('./pages/TransportApps'));
const JMLOrchestration = lazy(() => import('./pages/apps/JMLOrchestration'));
const ResponsibleAI    = lazy(() => import('./pages/ResponsibleAI'));
const AgentBuilder     = lazy(() => import('./pages/AgentBuilder'));
const MCPMarketplace   = lazy(() => import('./pages/MCPMarketplace'));

// Scroll-reveal observer — activates .reveal elements as they enter the viewport.
// Lightweight: a single IntersectionObserver, no MutationObserver thrashing.
function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target); // one-shot reveal
          }
        });
      },
      { threshold: 0.08 }
    );

    let rafId = 0;
    const attach = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observer.observe(el));
      });
    };

    attach();
    const mo = new MutationObserver(attach);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);
  return null;
}

const PageFallback = () => (
  <div style={{ padding: '120px 24px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
    Loading…
  </div>
);

// Standard layout — navbar + content + footer
const StandardLayout = ({ children }) => (
  <div style={{ minHeight: '100vh', background: 'var(--color-bg-primary)' }}>
    <Navbar />
    <div className="app-shell">
      <main style={{ paddingTop: 'var(--navbar-height)' }}>{children}</main>
      <Footer />
    </div>
  </div>
);

// App-like layout — navbar + full-height content, no footer
const AppLayout = ({ children }) => (
  <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-bg-primary)', overflow: 'hidden' }}>
    <Navbar />
    <div className="app-shell" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflow: 'hidden', marginTop: 'var(--navbar-height)' }}>
        {children}
      </div>
    </div>
  </div>
);

const AppContent = () => {
  const location = useLocation();

  if (location.pathname === '/agent-builder' || location.pathname === '/builder') {
    return (
      <AppLayout>
        <Suspense fallback={<PageFallback />}>
          <AgentBuilder />
        </Suspense>
      </AppLayout>
    );
  }

  return (
    <StandardLayout>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/"                         element={<Home />} />
          <Route path="/nhs-apps"                 element={<NHSApps />} />
          <Route path="/apps/jml-orchestration"   element={<JMLOrchestration />} />
          <Route path="/mhclg-apps"               element={<MHCLGApps />} />
          <Route path="/defra-apps"               element={<DefraApps />} />
          <Route path="/defence-apps"             element={<DefenceApps />} />
          <Route path="/transport-apps"           element={<TransportApps />} />
          <Route path="/responsible-ai"           element={<ResponsibleAI />} />
          <Route path="/mcp-marketplace"          element={<MCPMarketplace />} />
        </Routes>
      </Suspense>
    </StandardLayout>
  );
};

function App() {
  const basename = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || undefined;
  return (
    <ThemeProvider>
      <Router basename={basename}>
        <ScrollReveal />
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
