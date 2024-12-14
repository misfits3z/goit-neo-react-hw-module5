import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './App.css';

// Імпортуємо компоненти
const HomePage = lazy (() => import('./pages/HomePage/HomePage'))
const MoviesPage = lazy (() => import ('./pages/MoviesPage/MoviesPage'))
const MovieDetailsPage = lazy (() => import ('./pages/MovieDetaliesPage/MovieDetaliesPage'))
const MovieCast = lazy (() => import ('./components/MovieCast/MovieCast'))
const MovieReviews  = lazy (() => import ('./components/MovieReviews/MovieReviews'))
const NotFoundPage = lazy (() => import ('./pages/NotFoundPages/NotFoundPages'))
const Navigation = lazy (() => import ('./components/Navigation/Navigation'))

function App() {
  return(
    <div>
      <Navigation />
      <div className="container"> 
        <Suspense fallback={<h1>LOADING...</h1>}>
          <Routes>
            {/* Головна сторінка */}
            <Route path="/" element={<HomePage />} />

            {/* Сторінка пошуку */}
            <Route path="/movies" element={<MoviesPage />} />

            {/* Вкладені маршрути */}
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>

            {/* Сторінка для неіснуючих маршрутів */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  )
}

export default App;
