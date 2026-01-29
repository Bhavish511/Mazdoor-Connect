import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from '@/store/store'
import { AppProvider } from '@/context/app-context'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as SonnerToaster } from 'sonner'
import ErrorBoundary from '@/components/error-boundary'
import App from '@/App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <ErrorBoundary>
                <AppProvider>
                    <BrowserRouter>
                        <App />
                        <Toaster />
                        <SonnerToaster position="top-center" richColors />
                    </BrowserRouter>
                </AppProvider>
            </ErrorBoundary>
        </Provider>
    </React.StrictMode>,
)
