import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../store/movieSlice";
import { NOW_PLAYING_MOVIES_URL } from "../utils/api";

export default function useNowPlayingMovies() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.nowPlayingMovies);
  async function getNowPlayingMovies() {
    try {
      const res = await fetch(NOW_PLAYING_MOVIES_URL, API_OPTIONS);
      const data = await res.json();
      dispatch(addNowPlayingMovies(data?.results));
    } catch (err) {}
  }

  useEffect(() => {
    getNowPlayingMovies();
  }, []);

  return movies;
}
