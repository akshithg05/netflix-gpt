import { CircleInformation, PlayFill } from "grommet-icons";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";

export default function VideoTitle({ title, overview }) {
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );

  return (
    <div className="w-screen aspect-video md:pt-[20%] lg:pt-[10%] sm:pt-[15%] px-4 sm:px-8 md:px-20 absolute bg-gradient-to-r from-black to-transparent pb-6 sm:pb-10">
      <h1 className="text-xl sm:text-3xl md:text-4xl font-bold">{title}</h1>
      <p className="py-4 sm:py-6 text-sm sm:text-base md:text-lg w-full sm:w-3/4 lg:w-1/2">
        {overview}
      </p>
      <div className="gap-2 sm:gap-4 flex flex-wrap">
        <button className="bg-white text-sm sm:text-lg text-black px-2 sm:px-3 py-1 sm:py-2 rounded-sm cursor-pointer hover:bg-gray-300 flex items-center">
          <PlayFill color="black" className="mb-1 mr-1" />
          {lang[currentLanguage].play}
        </button>
        <button className="bg-gray-100/25 text-sm sm:text-lg text-white px-2 sm:px-3 py-1 sm:py-2 rounded-sm cursor-pointer hover:bg-gray-500 flex items-center">
          <CircleInformation className="mb-1 mr-1" color="white" />
          {lang[currentLanguage].more_info}
        </button>
      </div>
    </div>
  );
}
