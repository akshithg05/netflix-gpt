import { useRef } from "react";
import lang from "../utils/languageConstants";
import { useSelector, useDispatch } from "react-redux";
import opeanai from "../utils/openai";
import { API_OPTIONS, GPT_INSTRUCTIONS } from "../utils/constants";
import { searchMovieTMDBUrl } from "../utils/api";
import { addSearchedMovies } from "../store/gptSlice";

export default function GptSearchBar({ isLoading, setIsLoading }) {
  const dispatch = useDispatch();
  const searchTerm = useRef(null);
  const language = useSelector((state) => state.language.currentLanguage);

  async function searchMovieTMDB(movieName) {
    const resp = await fetch(searchMovieTMDBUrl(movieName), API_OPTIONS);

    const data = await resp.json();
    return data.results;
  }

  async function handleGptSearchClick() {
    try {
      setIsLoading(true);
      const gptQuery = GPT_INSTRUCTIONS;

      const response = await opeanai.responses.create({
        model: "gpt-4o",
        instructions: gptQuery,
        input: searchTerm.current.value,
      });

      if (!response?.output) {
        // TODO: Handle error case, redirect to error page
      }

      const gptMovies = response?.output?.[0].content?.[0]?.text
        ?.split(",")
        .map((movie) => movie.trim());

      let promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie)); // returns an array of promises
      let tmdbResults = await Promise.all(promiseArray); // gives array for resolved promises
      tmdbResults = tmdbResults.flat(); // flatten the array to get all results in one array
      tmdbResults = tmdbResults.filter((movie) => movie?.title);
      dispatch(
        addSearchedMovies({ tmdbResults: tmdbResults, gptMovies: gptMovies })
      );
    } catch (err) {
      // TODO: Handle error case, redirect to error page
    } finally {
      setIsLoading(false);
      searchTerm.current.value = "";
    }
  }
  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 bg-black p-4 rounded-xl gap-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchTerm}
          className="py-2 px-3 border rounded-sm w-full col-span-1 md:col-span-9"
          type="text"
          placeholder={lang[language].gpt_search_placeholder}
        />
        <button
          className="py-2 px-4 rounded-sm bg-red-700 font-bold text-white w-full md:w-auto col-span-1 md:col-span-3"
          type="submit"
          onClick={handleGptSearchClick}
        >
          {lang[language].search}
        </button>
      </form>
    </div>
  );
}
