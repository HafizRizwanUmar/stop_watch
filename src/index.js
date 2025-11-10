// src/main.jsx

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async'; // <-- Import
import App from './App.jsx';
import './index.css'; // Your main css file

// Simple loader component
const Loader = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<Loader />}>
      <HelmetProvider> {/* <-- Add Provider */}
        <App />
      </HelmetProvider> {/* <-- Add Provider */}
    </Suspense>
  </React.StrictMode>,
);