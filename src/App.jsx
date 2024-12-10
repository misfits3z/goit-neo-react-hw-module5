import { Route, Routes } from 'react-router-dom';
import './App.css';

// Імпортуємо компоненти
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import MovieCast from './components/MovieCast';
import MovieReviews from './components/MovieReviews';

function App() {
  return (
    <div>
      <Routes>
        {/* Головна сторінка */}
        <Route path="/" element={<HomePage />} />

        {/* Сторінка пошуку фільмів */}
        <Route path="/movies" element={<MoviesPage />} />

        {/* Сторінка деталей фільму з вкладеними маршрутами */}
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>

        {/* Сторінка для неіснуючих маршрутів */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
