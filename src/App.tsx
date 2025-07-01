import './App.css';
import BooksGrid from './components/BooksGrid';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AppBar from './components/AppBar';
import BookDetailsPage from './components/Book';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppBar />
        <div style={{ paddingTop: '64px' }}>
          <Routes>
            <Route path='/' element={<BooksGrid />} />
            <Route path='/book/:id' element={<BookDetailsPage />} />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
