import React from 'react';
import { Code2 } from 'lucide-react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-brand">
        <div className="header-logo">
          <Code2 size={20} />
        </div>
        <span className="header-title">
          AI Code Reviewer
        </span>
      </div>


    </header>
  );
};

export default Header;
