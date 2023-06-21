import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/normalize.global.css';
import './css/index.global.css';
import App from './components/App';
import { BrowserRouter as Router } from "react-router-dom";

const rootElem = document.getElementById('root');

const root = ReactDOM.createRoot(rootElem);

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
