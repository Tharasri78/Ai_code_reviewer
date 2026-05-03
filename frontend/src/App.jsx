import React from 'react';
import ReviewPage from './pages/ReviewPage';
import Header from './components/Header';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <ReviewPage />
      </main>
    </div>
  );
}

export default App;
