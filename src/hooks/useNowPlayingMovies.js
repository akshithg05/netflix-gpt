import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../store/movieSlice";

export default function useNowPlayingMovies() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.nowPlayingMovies);
  async function getNowPlayingMovies() {
    try {
      const url =
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
      const res = await fetch(url, API_OPTIONS);
      const data = await res.json();
      dispatch(addNowPlayingMovies(data));
    } catch (err) {}
  }

  useEffect(() => {
    getNowPlayingMovies();
  }, []);

  return movies;
}
