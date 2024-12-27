import React from 'react';
import ReactDOM from 'react-dom/client';

// react-router
import { BrowserRouter } from 'react-router-dom';

import './index.css';

// app
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
