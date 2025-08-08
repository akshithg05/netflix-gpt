import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUpComingMovies } from "../store/movieSlice";
import { UPCOMING_MOVIES_URL } from "../utils/api";

export default function useUpComingMovies() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.upComingMovies);
  async function getNowPlayingMovies() {
    try {
      const res = await fetch(UPCOMING_MOVIES_URL, API_OPTIONS);
      const data = await res.json();
      dispatch(addUpComingMovies(data?.results));
    } catch (err) {}
  }

  useEffect(() => {
    getNowPlayingMovies();
  }, []);

  return movies;
}
