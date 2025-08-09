import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";

export default function GptSearchBar() {
  const language = useSelector((state) => state.language.currentLanguage);
  console.log(language);
  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2  grid grid-cols-12 bg-black p-4 rounded-xl"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className="py-2 px-3 border rounded-sm w-150 col-span-9"
          type="text"
          placeholder={lang[language].gpt_search_placeholder}
        />
        <button
          className="py-2 px-4 rounded-sm bg-red-700 font-bold text-white col-span-3"
          type="submit"
        >
          {lang[language].search}
        </button>
      </form>
    </div>
  );
}
