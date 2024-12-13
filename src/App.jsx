import { Route, Routes } from 'react-router-dom';
import './App.css';

// Імпортуємо компоненти
import HomePage from './pages/HomePage/HomePage';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import MovieDetailsPage from './pages/MovieDetaliesPage/MovieDetaliesPage';
import MovieCast from './components/MovieCast/MovieCast';
import MovieReviews from './components/MovieReviews/MovieReviews';
import NotFoundPage from './pages/NotFoundPages/NotFoundPages'
import Navigation from './components/Navigation/Navigation';

function App() {
  return (
    <div>
      <>
      <Navigation/>
      <Routes>
        {/* Головна сторінка */}
        <Route path="/" element={<HomePage />} />

        {/* Сторінка пошуку  */}
        <Route path="/movies" element={<MoviesPage />} />

        {/* вкладені маршрути */}
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>

        {/* Сторінка для неіснуючих маршрутів */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </>
    </div>
  );
}

export default App;
