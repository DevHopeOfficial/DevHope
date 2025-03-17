
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add loading animation keyframes to the style
const style = document.createElement('style');
style.textContent = `
  @keyframes loading {
    0% { width: 0%; left: 0; transform: translateX(-5%); }
    50% { width: 70%; left: 15%; transform: translateX(10%); }
    100% { width: 0%; left: 100%; transform: translateX(5%); }
  }
`;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);
