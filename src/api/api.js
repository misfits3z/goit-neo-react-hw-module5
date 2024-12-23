import axios from "axios";
// import { data } from "react-router-dom";

const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTUzZmVmOGM1YTk5ZDNlYmIzZDEyZjgyNWE5ZDMxNyIsIm5iZiI6MTczMzcyOTM5My43ODksInN1YiI6IjY3NTY5YzcxY2YxODAxOTY4ZjAyZThmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZIdEWDpbNLHH_ZYqP_7vKeT50wWrWUfYEQRT6NhJ06w';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const options = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_TOKEN}`
  }
};

// Запит для отримання популярних фільмів
export const getMoviesList = async () => {
  try {
    const response = await axios.get('/trending/movie/day', options);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

// Запит для пошуку фільмів за ключовими словами
export const searchMovie = async (query) => {
  try {
    const response = await axios.get('/search/movie', {
      ...options,
      params: { query }, // Додаємо параметр пошуку
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

// Запит для деталей
export const getMovie = async (id) => {
  try {
    const response = await axios.get(`/movie/${id}`, {
      ...options,
      params: {
        language: 'en-US',
        include_adult: false 
      },
    });
    console.log('get movie', response.data)
    return response.data;
    
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

// акторський склад
export const getCast = async (id) => {
  try {
    const response = await axios.get(`/movie/${id}/credits`, {
      ...options,
      params: {
        language: 'en-US',
        include_adult: false 
      },
    });
    console.log('get cast', response.data)
    return response.data;
    
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

// огляд сторінки
export const getReviews = async (id) => {
  try {
    const response = await axios.get(`/movie/${id}/reviews`, {
      ...options,
      params: {
        language: 'en-US',
        include_adult: false 
      },
    });
    console.log('get reviews', response.data)
    return response.data;
    
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

// відео
export const getVideo = async (id) => {
  try {
    const response = await axios.get(`/movie/${id}/videos`, {
      ...options,
      params: {
        language: 'en-US',
        include_adult: false,
      },
    });
    console.log('get video', response.data);
    return response.data;  
  } catch (error) {
    console.error('Error fetching movie videos:', error);
    throw error;
  }
};