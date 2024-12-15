import { getCast } from "../../api/api";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import css from './MovieCast.module.css'

function MovieCast() {
  const [cast, setCast] = useState([]); 
  const { movieId } = useParams(); 
  const location = useLocation

  useEffect(() => {
    if (!movieId) return; 

    const fetchCast = async (id) => {
      try {
        const data = await getCast(id); 
        if (data && data.cast) {
          setCast(data.cast); 
          console.log("Fetched movie cast:", data.cast);
        } else {
          console.warn("No cast information found.");
        }
      } catch (error) {
        console.error("Failed to fetch movie cast:", error);
      }
    };

    fetchCast(movieId);
  }, [location, movieId]); 

  if (!cast.length) return <p>Loading...</p>;

  return (
    <div className={css.castContainer}>
      <ul className={css.castList}>
        {cast.map((actor) => (
          <li key={actor.id} className={css.castItem}>
            <img
              src={actor.profile_path ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}` : '/placeholder.jpg'}
              alt={actor.name}
              className={css.castImage}
            />
            <p className={css.actorName}>{actor.name}</p>
            <p className={    css.actorRole}>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieCast;