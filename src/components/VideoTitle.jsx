import { CircleInformation, PlayFill } from "grommet-icons";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";

export default function VideoTitle({ title, overview }) {
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );
  return (
    <div className="w-screen aspect-video pt-[15%] px-20 absolute bg-gradient-to-r from-black to-transparent pb-10">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/2">{overview}</p>
      <div className="gap-4 flex">
        <button className="bg-white text-lg text-black px-3 py-2 w-30 rounded-sm cursor-pointer hover:bg-gray-300 ">
          <PlayFill color="black" className="mb-1" />{" "}
          {lang[currentLanguage].play}
        </button>
        <button
          className="bg-gray-100/25 text-lg text-white px-3 py-1 w-40 rounded-sm cursor-pointer hover:bg-gray-500
        "
        >
          <CircleInformation className="mb-1" color="white" />{" "}
          {lang[currentLanguage].more_info}
        </button>
      </div>
    </div>
  );
}
