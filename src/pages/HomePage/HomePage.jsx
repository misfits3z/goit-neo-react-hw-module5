import { useState, useEffect } from "react";
import { getMoviesList } from "../../api/api"; 
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import css from './HomePage.module.css'

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMoviesList = async () => {
      setIsLoading(true); // Встановлюємо стан завантаження
      try {
        const data = await getMoviesList(); // Отримуємо список фільмів
        if (data && data.results) {
          setMovies(data.results); // Зберігаємо результати
          console.log("Movies:", data.results);
        } else {
          console.warn("No results found in API response:", data);
        }
      } catch (error) {
        console.error("Error fetching movies:", error); // Логування помилки
      } finally {
        setIsLoading(false); // Завершення завантаження
      }
    };

    fetchMoviesList();
  }, []); // Порожній масив залежностей — виконується лише один раз

  return (
    <div className={css.homePage}>
      <h1 className={css.today}>Trending today</h1>
      {isLoading ? (
        <Loader /> // Відображення завантажувача під час завантаження
      ) : (
        <ul>
          {movies.length > 0 ? (
            <MovieList movies={movies} /> // Відображення списку фільмів
          ) : (
            <p>No movies available.</p> // Повідомлення, якщо фільмів немає
          )}
        </ul>
      )}
    </div>
  );
}

export default HomePage;
  