import { use, useEffect, useState } from "react";
import { getMovieTrailerUrl } from "../utils/api";
import { API_OPTIONS, TRAILER } from "../utils/constants";
import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";

export default function TrailerModal({ movie, setIsOpen }) {
  const [isLoading, setIsLoading] = useState(false);
  const [trailer, setTrailer] = useState();
  const [error, setError] = useState();
  const language = useSelector((store) => store.language.currentLanguage);

  async function getTrailer() {
    try {
      setIsLoading(true);
      let trailerUrl = getMovieTrailerUrl(movie?.id);
      let resp = await fetch(trailerUrl, API_OPTIONS);
      let data = await resp.json();
      let trailerData = data.results.filter((video) => video?.type === TRAILER);
      setTrailer(trailerData);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getTrailer();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div
        className="bg-black rounded-lg shadow-lg z-10 p-4 
             lg:w-5/8 md:w-3/4 sm:w-full
              overflow-y-auto flex flex-col justify-between"
      >
        <h2 className="text-xl font-bold text-white">{movie.title}</h2>
        {isLoading ? (
          <p className="pt-10">{lang[language].loading}</p>
        ) : trailer && trailer.length > 0 ? (
          <iframe
            className="w-full aspect-video"
            src={`https://www.youtube.com/embed/${trailer[0].key}?autoplay=1&mute=0&rel=0&controls=0&modestbranding=1&showinfo=0&iv_load_policy=3`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        ) : (
          <p className="pt-10">{lang[language].no_trailer_message}</p>
        )}

        <button
          onClick={() => setIsOpen(false)}
          className="mt-6 self-end px-4 py-2  bg-red-700 text-white rounded hover:cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
}
