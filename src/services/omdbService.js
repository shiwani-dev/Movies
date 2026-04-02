import axios from "axios";

const API_KEY = "6d3362d0";

export const fetchMovies = async (search, page) => {
  const response = await axios.get(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&page=${page}`
  );
  return response.data;
};