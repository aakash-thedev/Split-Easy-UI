import React, { Suspense } from 'react';
import './App.css';
import AvailableRoutes from './utils/AvailableRoutes';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Suspense fallback={<div>Loading...</div>}>
        <AvailableRoutes />
      </Suspense>
    </div>
  );
};

export default App;
