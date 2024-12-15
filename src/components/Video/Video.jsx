import { getVideo } from "../../api/api";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import css from './Video.module.css'


function Videos() {
    const [video, setVideo] = useState([]); 
    const { movieId } = useParams(); 
    const location = useLocation();
  
    useEffect(() => {
      if (!movieId) return; 
  
      const fetchVideo = async (id) => {
        try {
          const data = await getVideo(id); 
          if (data && data.results) {
            const limitedVideos = data.results.slice(0, 4); // Обмеження на 4 відео
            setVideo(limitedVideos); 
            console.log("Fetched movie video:", limitedVideos);
          } else {
            console.warn("No video found.");
          }
        } catch (error) {
          console.error("Failed to fetch movie video:", error);
        }
      };
  
      fetchVideo(movieId);
    }, [movieId, location]);
  
    if (!video.length) return <p>Loading...</p>;
  
    return (
      <div className={css.videoContainer}>
        <h2 className={css.videoTitle}>Videos</h2>
        <ul className={css.videoList}>
          {video.map((movie) => (
            <li key={movie.id} className={css.videoItem}>
              <iframe 
                className={css.videoFrame}
                width="560" 
                height="315" 
                src={`https://www.youtube.com/embed/${movie.key}`} 
                title={movie.name} 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default Videos;