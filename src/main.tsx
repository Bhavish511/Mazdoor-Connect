import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from '@/store/store'
import { AppProvider } from '@/context/app-context'
import { Toaster } from '@/components/ui/toaster'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <AppProvider>
                <BrowserRouter>
                    <App />
                    <Toaster />
                </BrowserRouter>
            </AppProvider>
        </Provider>
    </React.StrictMode>,
)
