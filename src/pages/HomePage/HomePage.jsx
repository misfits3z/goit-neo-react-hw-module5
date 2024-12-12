import { useState, useEffect } from "react";
import { getMoviesList } from '../../api/api'; 
import MoveList from '../../components/MoveList/MoveList'

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMoviesList = async () => {
      try {
        const data = await getMoviesList();
        if (data && data.results){
          setMovies(data.results); 
          console.log("Movies:", data.results);
        } else {
          console.warn("No results found in API response:", data);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMoviesList();
  }, []); // Порожній масив залежностей рендериться один раз


  return (
    <div>
      <h1>Trending today</h1>
      <ul>
        <MoveList movies={movies} />
      </ul>
    </div>
  );
}

export default HomePage;
  