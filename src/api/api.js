const url = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1';
const API_KEY = '0a53fef8c5a99d3ebb3d12f825a9d317'

const options = {
  headers: {
	// Замість api_read_access_token вставте свій токен
    Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTUzZmVmOGM1YTk5ZDNlYmIzZDEyZjgyNWE5ZDMxNyIsIm5iZiI6MTczMzcyOTM5My43ODksInN1YiI6IjY3NTY5YzcxY2YxODAxOTY4ZjAyZThmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZIdEWDpbNLHH_ZYqP_7vKeT50wWrWUfYEQRT6NhJ06w'
  }
};

axios.get(url, options)
  .then(response => console.log(response))
  .catch(err => console.error(err));
