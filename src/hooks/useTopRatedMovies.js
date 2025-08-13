import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies } from "../store/movieSlice";
import { TOP_RATED_MOVIES_URL } from "../utils/api";

export default function useTopRatedMovies() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.topRatedMovies);
  async function getNowPlayingMovies() {
    try {
      const res = await fetch(TOP_RATED_MOVIES_URL, API_OPTIONS);
      const data = await res.json();
      dispatch(addTopRatedMovies(data?.results));
    } catch (err) {}
  }

  useEffect(() => {
    !movies && getNowPlayingMovies();
  }, []);

  return movies;
}
