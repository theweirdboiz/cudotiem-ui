import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App'
import { ToastContainer } from 'react-toastify'
import { SearchProvider } from './contexts/searchContext'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PostProvider } from './contexts/postContext'

import { CategoryProvider } from './contexts/categoryContext'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/authContext'
import 'react-toastify/dist/ReactToastify.css'
import './index.scss'
import './i18n/i18n'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 5 * 1000
    }
  }
})
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <AuthProvider>
          <CategoryProvider>
            <PostProvider>
              <SearchProvider>
                <ToastContainer autoClose={1200}></ToastContainer>
                <App />
                <ReactQueryDevtools initialIsOpen={false} />
              </SearchProvider>
            </PostProvider>
          </CategoryProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
