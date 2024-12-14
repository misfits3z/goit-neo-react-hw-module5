
import { useState, useEffect, Suspense } from "react";
import { useParams, Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import { getMovie } from "../../api/api";

function MovieDetailsPage() {
  const [movie, setMovieDetails] = useState([]);
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Зберігаємо стан для повернення
  const backLink = location.state?.from ?? "/movies";
  const query = location.state?.query || "";
  const results = location.state?.results || [];

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieDetails = async (id) => {
      try {
        const data = await getMovie(id);
        setMovieDetails(data);
      } catch {
        console.error("Failed to fetch movie details. Please try again later.");
      }
    };

    fetchMovieDetails(movieId);
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div>
      <button onClick={() => navigate(backLink, { state: { query, results } })}>Go back</button>
      <h1>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
      <div>
        <h2>Overview</h2>
        <p>{movie.overview}</p>
        <h3>Genres</h3>
        {movie.genres &&
          movie.genres.map((g) => (
            <span key={g.id}>{g.name}</span>
          ))}
      </div>
      <p>Additional information</p>
      <ul>
        <li>
          <Link to="cast" state={{ from: backLink }}>Cast</Link>
        </li>
        <li>
          <Link to="reviews" state={{ from: backLink }}>Reviews</Link>
        </li>
      </ul>
      <Suspense fallback={<div>Loading additional info...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}

export default MovieDetailsPage;