import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';

import AppRoutes from './routes/AppRoutes';

function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      }
    }
  });

  return (
    <QueryClientProvider client={client}>
      <AppRoutes />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover
        hideProgressBar
        pauseOnFocusLoss
        theme="light"
      />
    </QueryClientProvider>
  );
}

export default App;
