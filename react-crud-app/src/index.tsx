import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import store from './state/store';
import App from './App';
import './index.css'; // Import Tailwind CSS

const queryClient = new QueryClient();
const container = document.getElementById('root');
if (!container) throw new Error('Root container not found');
const root = createRoot(container); // Create a root.

root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Provider>
);