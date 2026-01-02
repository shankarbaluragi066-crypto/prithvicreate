
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log("[Prithvi Creation] Initializing Marketplace Engine...");

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("[Prithvi Creation] FATAL: Mount point #root not found in HTML.");
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("[Prithvi Creation] App Mounted Successfully.");
} catch (err) {
  console.error("[Prithvi Creation] FATAL: React failed to render.", err);
  rootElement.innerHTML = `
    <div style="padding: 40px; text-align: center; font-family: sans-serif; color: #333;">
      <h2 style="color: #ef4444;">System Error</h2>
      <p>The marketplace failed to initialize. This usually happens if the browser storage is full or corrupted.</p>
      <button onclick="localStorage.clear(); location.reload();" style="padding: 12px 24px; background: #2563eb; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">
        Clear Data & Reload
      </button>
    </div>
  `;
}
