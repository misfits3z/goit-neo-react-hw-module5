import { useState, useEffect, Suspense } from "react";
import { useParams, Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getMovie } from "../../api/api";
import css from './MovieDetaliesPage.module.css';
import { FaCaretRight, FaRegClock, FaAngleRight } from 'react-icons/fa';
import Videos from "../../components/Video/Video";


function MovieDetailsPage() {
  const [movie, setMovieDetails] = useState([]);
  const [showVideo, setShowVideo] = useState(false); 
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

 
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

  const handleVideoClick = () => {
    setShowVideo(true); 
  };

  return (
    <div className={css.movieDetailsContainer}>
      <button onClick={() => navigate(backLink, { state: { query, results } })}>Go back</button>

      {movie ? (
        <>
          <div className={css.detailsContent}>
            <div className={css.imageContainer}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className={css.movieImage}
              />
            </div>

            <div className={css.infoContainer}>
              <h1>{movie.title}</h1>
              <h2>Overview</h2>
              <p className={css.overviewP}>{movie.overview}</p>

              <h3 className={css.genres}>Genres</h3>
              <div className={css.genreList}>
                {movie.genres && movie.genres.map((g) => (
                  <span key={g.id} className={css.genreItem}>
                    <FaCaretRight className={css.iconGenre} /> {g.name}
                  </span>
                ))}
              </div>

              <h3>Duration</h3>
              <div className={css.duration}>
                <FaRegClock className={css.iconDuration} />
                <span>{movie.runtime} min</span>
              </div>

              <button 
                className={css.videoButton} 
                onClick={handleVideoClick}
              >
                Movie trailer
              </button>
            </div>
          </div>

          {showVideo && <Videos movieId={movieId} />}

          <div className={css.additionalInfo}>
            <h3>Additional information</h3>
            <ul>
              <li>
                <FaAngleRight className={css.iconInfo} />
                <Link to="cast" state={{ from: backLink }}>Cast</Link>
              </li>
              <li>
                <FaAngleRight className={css.iconInfo} />
                <Link to="reviews" state={{ from: backLink }}>Reviews</Link>
              </li>
            </ul>
          </div>

          <Suspense fallback={<div>Loading additional info...</div>}>
            <Outlet />
          </Suspense>
        </>
      ) : (
        <div>Loading movie details...</div>
      )}
    </div>
  );
}

export default MovieDetailsPage;