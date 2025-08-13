import { useEffect } from "react";
import { API_OPTIONS, TRAILER } from "../utils/constants";
import { getMovieTrailerUrl } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../store/movieSlice";

export default function useMovieTrailer(movieId) {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((state) => state?.movies?.trailerVideo);

  async function getMovieTrailer(movieId) {
    const url = getMovieTrailerUrl(movieId);
    const res = await fetch(url, API_OPTIONS);
    const data = await res.json();
    const movieTrailer = data?.results?.find((video) => video.type === TRAILER);
    if (!movieTrailer) {
      dispatch(addTrailerVideo(data?.results?.[0]));
    }

    dispatch(addTrailerVideo(movieTrailer));
  }

  useEffect(() => {
    if (movieId) {
      !trailerVideo && getMovieTrailer(movieId);
    }
  }, [movieId]);

  return trailerVideo;
}
