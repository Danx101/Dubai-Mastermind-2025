import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Note: js-loaded class is added in index.html <head> (before body renders)
// Visibility is controlled by CSS, not JavaScript

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
