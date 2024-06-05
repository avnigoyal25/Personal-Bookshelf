import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookSearch from './components/BookSearch';
import BookShelf from './components/BookShelf';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BookSearch/>} />
          <Route path="/bookshelf" element={<BookShelf/>} />
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
