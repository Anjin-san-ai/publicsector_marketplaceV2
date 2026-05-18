import { Shield, Lock, MessageSquare } from 'lucide-react';

const Footer = () => (
  <footer>
    {/* ── Gov.uk blue footer bar ── */}
    <div className="footer-bar">
      <div>
        <div className="footer-logo">
          <div className="footer-logo-icon">UK</div>
          UK Public Sector
        </div>
        <p className="footer-tagline">
          Trusted AI solutions for UK Government departments. Secure, compliant, and responsible.
        </p>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
          Version 2.1 · May 2026
        </p>
      </div>
    </div>

    {/* ── Bottom bar ── */}
    <div className="footer-bottom">
      <p>© 2026 Crown Copyright. All rights reserved.</p>
      <div className="footer-bottom-actions">
        <button className="footer-bottom-btn">
          <Shield size={13} />
          Accessibility
        </button>
        <button className="footer-bottom-btn">
          <Lock size={13} />
          Security
        </button>
        <button className="footer-bottom-btn">
          <MessageSquare size={13} />
          Feedback
        </button>
      </div>
    </div>
  </footer>
);

export default Footer;
