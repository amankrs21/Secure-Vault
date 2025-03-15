import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'


// Render the application [ENTRY POINT]
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
