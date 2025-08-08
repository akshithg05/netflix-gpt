import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../store/movieSlice";
import { POPULAR_MOVIES_URL } from "../utils/api";

export default function usePopularMovies() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.popularMovies);
  async function getNowPlayingMovies() {
    try {
      const res = await fetch(POPULAR_MOVIES_URL, API_OPTIONS);
      const data = await res.json();
      dispatch(addPopularMovies(data?.results));
    } catch (err) {}
  }

  useEffect(() => {
    getNowPlayingMovies();
  }, []);

  return movies;
}
