import { getCast } from "../../api/api";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

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
    <div>
      <ul>
        {cast.map((actor) => (
          <li key={actor.id}>
            <img
              src={actor.profile_path ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}` : '/placeholder.jpg'}
              alt={actor.name}
            />
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieCast;