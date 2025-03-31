import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from './contexts/ThemeContext'
import { AppThemeProvider } from './contexts/AppThemeContext'

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <Analytics />
      <ThemeProvider>
         <AppThemeProvider>
            <App />
         </AppThemeProvider>
      </ThemeProvider>
   </StrictMode>
)
