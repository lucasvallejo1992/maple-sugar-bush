import { QueryClient, QueryClientProvider } from 'react-query';

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
    </QueryClientProvider>
  );
}

export default App;
