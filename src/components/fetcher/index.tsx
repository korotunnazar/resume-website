import axios from 'axios';

const API_KEY = 'YOUR_API_KEY';  // Replace with your TMDb API key
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbService = {
    fetchMovies: (page = 1) => {
        return axios.get(`${BASE_URL}/movie/popular`, {
            params: {
                api_key: API_KEY,
                page: page,
            },
        });
    },
    fetchTVShows: (page = 1) => {
        return axios.get(`${BASE_URL}/tv/popular`, {
            params: {
                api_key: API_KEY,
                page: page,
            },
        });
    },
};

export default tmdbService;
