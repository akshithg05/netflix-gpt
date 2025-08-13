import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addActionMovies } from "../store/movieSlice";
import { ACTION_MOVIES_URL } from "../utils/api";

export default function useActionMovies() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.actionMovies);
  async function getNowPlayingMovies() {
    try {
      const res = await fetch(ACTION_MOVIES_URL, API_OPTIONS);
      const data = await res.json();
      dispatch(addActionMovies(data?.results));
    } catch (err) {}
  }

  useEffect(() => {
    !movies && getNowPlayingMovies();
  }, []);

  return movies;
}
