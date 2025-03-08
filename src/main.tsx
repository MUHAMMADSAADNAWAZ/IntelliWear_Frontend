import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { persistor, store } from "./redux/store";
import App from './App.tsx'

import './index.css'

const queryclient = new QueryClient()

createRoot(document.getElementById('root')!).render(

  <QueryClientProvider client={queryclient}>

  <StrictMode>
    <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
  </StrictMode>,
  </QueryClientProvider>
)
