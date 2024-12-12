import { getMovie } from "../../api/api";


function MovieDetailsPage (){
    const [movies, setMovies] = useState([]); 

    useEffect(() => {
        if (!searchQuery) return; // Якщо немає запиту, не виконуємо запит до API
    
        const fetchMovies = async () => {
          try {
            const data = await getMovie(searchQuery); // Виклик API
            setMovies(data.results); // Зберігаємо результати у стан
          } catch (error) {
            toast.error("Failed to fetch movies. Please try again later.");
          }
        };
        fetchMovies();
    }, [])



    return (
        <div>
          <h1></h1>
          <img></img>
          <div>
            <p></p>
            <h2>Owerview</h2>
            <p></p>
            <h3>Genres</h3>
            <p>{}</p>
          </div>
          <p>Additional information</p>
          <ul>
            <li>
                <a></a>
            </li>
          </ul>
        </div>
    )
}

export default MovieDetailsPage