import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';
import { ShieldCheck, Bug, Zap, Code, Star, Copy, Check, Info } from 'lucide-react';

const ResultsSection = ({ data }) => {
  const [activeTab, setActiveTab] = useState('analysis');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(data.optimized_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button 
          onClick={() => setActiveTab('analysis')}
          className={`btn ${activeTab === 'analysis' ? 'btn-primary' : 'btn-ghost'}`}
          style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}
        >
          <ShieldCheck size={14} /> Analysis
        </button>
        <button 
          onClick={() => setActiveTab('code')}
          className={`btn ${activeTab === 'code' ? 'btn-primary' : 'btn-ghost'}`}
          style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}
        >
          <Code size={14} /> Refactored
        </button>
      </div>

      <div className="card" style={{ minHeight: '500px' }}>
        {activeTab === 'analysis' ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            {/* Score Card */}
            <div style={{ padding: '1.25rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.625rem', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem', display: 'block' }}>Code Quality Score</span>
                <div style={{ fontSize: '2rem', fontWeight: '800' }}>{data.score}/10</div>
              </div>
              <div className="score-badge">
                 <span className="score-value">{data.score}</span>
                 <span className="score-label">Score</span>
              </div>
            </div>

            {/* Content Groups */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <SectionGroup 
                icon={<Bug size={16} style={{ color: 'var(--danger)' }} />}
                title="Critical Bugs"
                items={data.bugs}
                empty="No bugs detected."
                type="bug"
              />
              
              <SectionGroup 
                icon={<Info size={16} style={{ color: 'var(--warning)' }} />}
                title="Optimization Opportunities"
                items={data.issues}
                empty="Code looks optimal."
                type="warning"
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  <Zap size={14} style={{ color: 'var(--success)' }} /> Key Takeaways
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {data.improvements?.map((imp, i) => (
                    <div key={i} className="issue-card improvement" style={{ padding: '0.75rem 1rem', margin: 0 }}>
                      <div style={{ fontSize: '0.8125rem' }}>{imp}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Optimized Snippet</h4>
              <button 
                onClick={copyToClipboard}
                className="btn btn-ghost"
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem' }}
              >
                {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
              </button>
            </div>
            <div className="code-block" style={{ flex: 1 }}>
              <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(data.optimized_code, Prism.languages.javascript, 'javascript') }} />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const SectionGroup = ({ icon, title, items, empty, type }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
    <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
      {icon} {title}
    </h4>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {items && items.length > 0 ? (
        items.map((item, i) => (
          <div key={i} className={`issue-card ${type}`} style={{ margin: 0 }}>
            <div style={{ fontSize: '0.625rem', fontWeight: '800', textTransform: 'uppercase', marginBottom: '0.25rem', opacity: 0.8 }}>{item.line}</div>
            <div className="issue-title" style={{ fontSize: '0.875rem' }}>{item.description}</div>
          </div>
        ))
      ) : (
        <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>{empty}</div>
      )}
    </div>
  </div>
);

export default ResultsSection;
