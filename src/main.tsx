import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import "./index.css";
import App from './App.tsx';

const rootContainer = document.getElementById('root');

if(rootContainer) {
  const root: Root = rootContainer && createRoot(rootContainer)
  root.render(<App />)
} else {
  console.error(`Root element with ID "root" not found in DOM.`);
}
