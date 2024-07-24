import './index.css';
import { createRoot } from 'react-dom/client';
import React from 'react';
//import App from './admin-panel/App.js';
import App from './App.js';

import { DarkModeContextProvider } from "./admin-panel/context/darkModeContext";
import "./i18n";
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './admin-panel/context/AuthContext.js';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);


root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
