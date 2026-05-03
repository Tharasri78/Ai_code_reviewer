import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EditorSection from '../components/EditorSection';
import ResultsSection from '../components/ResultsSection';
import { reviewCode } from '../services/api';
import { Sparkles, Terminal, AlertCircle, Loader2 } from 'lucide-react';

const ReviewPage = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleReview = async (code, language) => {
    setLoading(true);
    setError(null);
    try {
      const data = await reviewCode(code, language);
      setResults(data);
    } catch (err) {
      setError(typeof err === 'string' ? err : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Left Column: Editor */}
      <div className="column">
        <div className="section-header">
          <div className="section-title">
            <Terminal size={16} />
            <span>Input Code</span>
          </div>
        </div>
        <div className="column-scrollable">
          <EditorSection onReview={handleReview} isLoading={loading} />
        </div>
      </div>
      
      {/* Right Column: Results */}
      <div className="column" style={{ borderLeft: '1px solid var(--border-color)' }}>
        <div className="section-header">
          <div className="section-title">
            <Sparkles size={16} />
            <span>AI Analysis</span>
          </div>
        </div>
        
        <div className="column-scrollable">
          <AnimatePresence mode="wait">
            {!results && !loading && !error && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="card"
                style={{ textAlign: 'center', padding: '4rem 2rem' }}
              >
                <div style={{ width: '64px', height: '64px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <Terminal className="text-muted" size={32} />
                </div>
                <h3>Ready for Review</h3>
                <p>Paste your code in the editor and click "Run Analysis" to get feedback.</p>
              </motion.div>
            )}

            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="card"
                style={{ textAlign: 'center', padding: '4rem 2rem' }}
              >
                <div className="spinner" style={{ margin: '0 auto 1.5rem' }}></div>
                <h3>Analyzing your code...</h3>
                <p>Our AI is looking for bugs and optimizations.</p>
              </motion.div>
            )}

            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="card"
                style={{ textAlign: 'center', padding: '4rem 2rem', borderColor: 'var(--danger)' }}
              >
                <AlertCircle className="text-danger" size={48} style={{ margin: '0 auto 1.5rem' }} />
                <h3 style={{ color: 'var(--danger)' }}>Analysis Failed</h3>
                <p style={{ marginBottom: '1.5rem' }}>{error}</p>
                <button onClick={() => setError(null)} className="btn btn-primary">Try Again</button>
              </motion.div>
            )}

            {results && !loading && (
              <ResultsSection key="results" data={results} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default ReviewPage;
