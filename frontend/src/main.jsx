import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './lib/auth.jsx';
import Web3Providers from './web3/provider.jsx';

// Entry point for the React app.  We wrap the App component in a
// BrowserRouter so that react‑router can manage client side routes.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Web3Providers>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </Web3Providers>
  </React.StrictMode>
);