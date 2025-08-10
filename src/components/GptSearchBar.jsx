import { useRef } from "react";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";
import opeanai from "../utils/openai";

export default function GptSearchBar() {
  const searchTerm = useRef(null);
  const language = useSelector((state) => state.language.currentLanguage);

  async function handleGptSearchClick() {
    const gptQuery =
      "You are a movie recommendation system and suggest some movies based on the user's input: Do not give any other results or deviate form the topic. Just give the 5 movie names, comma seperated and nothing else, Example result: Don, F1, The Batman, The Dark Knight, Interstellar, Inception, Joker, Avengers: Endgame, Avengers: Infinity War, Thor: Ragnarok";

    const response = await opeanai.responses.create({
      model: "gpt-4o",
      instructions: gptQuery,
      input: searchTerm.current.value,
    });

    if (!response?.output) {
      // TODO: Handle error case
    }

    const gptMovies = response?.output?.[0].content?.[0]?.text
      ?.split(",")
      .map((movie) => movie.trim());

    console.log(gptMovies);
  }
  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2  grid grid-cols-12 bg-black p-4 rounded-xl"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchTerm}
          className="py-2 px-3 border rounded-sm w-150 col-span-9"
          type="text"
          placeholder={lang[language].gpt_search_placeholder}
        />
        <button
          className="py-2 px-4 rounded-sm bg-red-700 font-bold text-white col-span-3"
          type="submit"
          onClick={handleGptSearchClick}
        >
          {lang[language].search}
        </button>
      </form>
    </div>
  );
}
