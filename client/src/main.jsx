import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './index.css';
import App from './App.jsx';
import Loading from './components/loading/Loading.jsx';
import { LoadingProvider } from './components/loading/LoadingContext.jsx';
import ErrorBoundary from './middleware/ErrorBoundary.jsx';
import ErrorPage from './pages/error/ErrorPage.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoadingProvider>
      <Loading />
      <ToastContainer theme="colored" draggable={false} hideProgressBar={true} position="bottom-right" />
      <ErrorBoundary fallback={<ErrorPage />}>
        <App />
      </ErrorBoundary>
    </LoadingProvider>
  </StrictMode>,
)
