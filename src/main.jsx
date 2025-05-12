import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from './contexts/ThemeContext'
import { AppThemeProvider } from './contexts/AppThemeContext'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store/Store.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <Analytics />
      <ThemeProvider>
         <AppThemeProvider>
            <Provider store={store}>
               <PersistGate loading={null} persistor={persistor}>
                  <Router>
                     <Routes>
                        <Route path='/' element={<LandingPage />} />
                        <Route path='/app' element={<App />} />
                     </Routes>
                  </Router>
               </PersistGate>
            </Provider>
         </AppThemeProvider>
      </ThemeProvider>
   </StrictMode>
)
