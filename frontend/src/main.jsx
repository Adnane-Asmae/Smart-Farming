import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import './index.css'
import App from './App.jsx'
import './i18n/index.js'
import i18n from './i18n/index.js'

const container = document.getElementById('root')
const root = createRoot(container)

const RootComponent = () => {
  const [locale, setLocale] = useState(i18n.language)
  const rtlLanguages = ['ar', 'zgh']
  
  useEffect(() => {
    const handleLanguageChange = (lng) => {
      setLocale(lng)
    }
    i18n.on('languageChanged', handleLanguageChange)
    return () => {
      i18n.off('languageChanged', handleLanguageChange)
    }
  }, [])
  
  return (
    <ConfigProvider direction={rtlLanguages.includes(locale) ? 'rtl' : 'ltr'}>
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>
    </ConfigProvider>
  )
}

root.render(<RootComponent />)
