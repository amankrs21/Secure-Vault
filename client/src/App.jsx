import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Slide } from 'react-toastify';

import Router from "./Router";
import Loading from './components/Loading';
import ErrorPage from './components/ErrorPage';
import ErrorBoundary from './middleware/ErrorBoundary';
import { LoadingProvider } from './contexts/LoadingContext';


// App component
export default function App() {

  return (
    <ErrorBoundary fallback={<ErrorPage />}>

      <LoadingProvider>
        <Loading /> {/* Loading component */}

        <Router /> {/* Routing Pages */}
      </LoadingProvider>

      {/* Toastify */}
      <ToastContainer
        theme="colored"
        draggable={false}
        transition={Slide}
        hideProgressBar={true}
        position="bottom-right"
      />

    </ErrorBoundary>
  );
};
