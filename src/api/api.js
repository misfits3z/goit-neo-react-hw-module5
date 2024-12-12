import axios from "axios";

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
export const getMovie = async (query) => {
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