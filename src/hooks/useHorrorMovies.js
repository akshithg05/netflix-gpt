import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addHorrorMovies } from "../store/movieSlice";
import { HORROR_MOVIES_URL } from "../utils/api";

export default function useHorrorMovies() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.horrorMovies);
  async function getNowPlayingMovies() {
    try {
      const res = await fetch(HORROR_MOVIES_URL, API_OPTIONS);
      const data = await res.json();
      dispatch(addHorrorMovies(data?.results));
    } catch (err) {}
  }

  useEffect(() => {
    !movies && getNowPlayingMovies();
  }, []);

  return movies;
}
