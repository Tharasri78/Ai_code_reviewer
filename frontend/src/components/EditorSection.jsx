import React, { useState } from 'react';
import _Editor from 'react-simple-code-editor';
const Editor = (typeof _Editor === 'function' ? _Editor : _Editor.default) || _Editor;
import Prism from 'prismjs';

import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism-tomorrow.css';

import { Code2, Sparkles, ChevronDown } from 'lucide-react';

const EditorSection = ({ onReview, isLoading }) => {
  const [code, setCode] = useState(`// Paste your code here...
function example() {
  console.log("Hello, World!");
}`);
  const [language, setLanguage] = useState('javascript');

  const languages_list = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'markup', label: 'HTML' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '1rem' }}>
      <div className="editor-container">
        <div style={{ padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }}></div>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></div>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}></div>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>main.{language === 'javascript' ? 'js' : language}</span>
          </div>

          <div style={{ position: 'relative' }}>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="select-input"
              style={{ paddingRight: '2rem' }}
            >
              {languages_list.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="text-muted"
              size={14}
              style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
            />
          </div>
        </div>

        <div style={{ flex: 1, overflow: 'auto' }}>
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={(code) =>
              Prism.highlight(code, Prism.languages[language] || Prism.languages.javascript, language)
            }
            padding={20}
            style={{
              fontFamily: 'Fira Code, monospace',
              fontSize: 14,
              minHeight: '100%',
              backgroundColor: 'transparent',
              color: 'var(--text-primary)',
            }}
          />
        </div>
      </div>

      <button
        onClick={() => onReview(code, language)}
        disabled={isLoading || !code.trim()}
        className="btn btn-primary"
        style={{ width: '100%', padding: '1rem' }}
      >
        {isLoading ? (
          <>
            <div className="spinner" style={{ width: '1.25rem', height: '1.25rem', borderWidth: '2px' }}></div>
            <span>Analyzing...</span>
          </>
        ) : (
          <>
            <Sparkles size={18} />
            <span>Analyze Code</span>
          </>
        )}
      </button>
    </div>
  );
};

export default EditorSection;