import { getMovie } from "../../api/api";
import { useState, useEffect, Suspense } from "react";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";

function MovieDetailsPage() {
  const [movie, setMovieDetails] = useState([]); 
  const { movieId } = useParams(); // id з параметрів маршруту
  const location = useLocation();

  useEffect(() => {
    if (!movieId) return; 

    const fetchMovieDetails = async (id) => {
      try {
        const data = await getMovie(id); 
        setMovieDetails(data); 
        console.log("Fetched movie data:", data);
      } catch {
        console.error("Failed to fetch movie details. Please try again later.");
      }
    };

    fetchMovieDetails(movieId);
  }, [location, movieId]); 

  if (!movie) return <p>Loading...</p>; 

  return (
    <div>
      <h1>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
      <div>
        <h2>Overview</h2>
        <p>{movie.overview}</p>
        <h3>Genres</h3>
        {movie.genres && movie.genres.map((g) => (
            <span key={g.id}>{g.name}</span>
          ))}
      </div>
      <p>Additional information</p>
      <ul>
        <li>
        <Link to="cast">Cast</Link>
        </li>
        <li>
        <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Suspense fallback={<div>Loading additional info...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}

export default MovieDetailsPage;