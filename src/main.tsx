import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App.tsx'

import './index.css'

const queryclient = new QueryClient()

createRoot(document.getElementById('root')!).render(

  <QueryClientProvider client={queryclient}>

  <StrictMode>
    <Provider store={store}>
    <PersistGate persistor={persistor}>
    <App />
    </PersistGate>
  </Provider>
  </StrictMode>,
  </QueryClientProvider>
)
