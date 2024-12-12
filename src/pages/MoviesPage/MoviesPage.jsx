import { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";

import { searchMovie } from '../../api/api'; // Імпорт API функції
import css from './MoviesPage.module.css';

function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState(""); // Стан для збереження пошукового запиту
  const [movies, setMovies] = useState([]); // Стан для збереження результатів фільмів

  const notify = () =>
    toast.error("The search query must be at least 2 characters long", {
      duration: 3000,
      position: "top-right",
    });

  const handleSubmit = (values, actions) => {
    const query = values.query.trim().toLowerCase();
    if (query.length < 2) {
      notify();
    } else {
      setSearchQuery(query); // Оновлюємо стан пошукового запиту
    }
    actions.resetForm();
  };

  useEffect(() => {
    if (!searchQuery) return; // Якщо немає запиту, не виконуємо запит до API

    const fetchMovies = async () => {
      try {
        const data = await searchMovie(searchQuery); // Виклик API
        setMovies(data.results); // Зберігаємо результати у стан
      } catch (error) {
        toast.error("Failed to fetch movies. Please try again later.");
      }
    };

    fetchMovies();
  }, [searchQuery]); // Виконати лише коли змінюється `searchQuery`

  return (
    <>
      <Formik initialValues={{ query: "" }} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <Field
            className={css.inputSearch}
            name="query"
            type="text"
            placeholder="Search movies"
          />
          <button className={css.buttonSearch} type="submit">
            {/* Додайте іконку пошуку або текст */}
            Search
          </button>
        </Form>
      </Formik>

      <ul className={css.moviesList}>
        {movies.length > 0 ? (
          movies.map(movie => (
            <li key={movie.id} className={css.movieItem}>
              {movie.title}
            </li>
          ))
        ) : (
          <p className={css.noResults}>No movies found</p>
        )}
      </ul>
    </>
  );
}

export default MoviesPage;