import { useSelector } from "react-redux";
import { useRouteError, Link } from "react-router-dom";
import lang from "../utils/languageConstants";

export default function ErrorPage() {
  const error = useRouteError();
  const currentLanguage = useSelector(
    (store) => store.language.currentLanguage
  );

  return (
    <div className="bg-black text-white h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold mb-4">Lost your way?</h1>
      <p className="text-lg text-gray-400 mb-8 text-center max-w-md">
        {lang[currentLanguage].error_page}
      </p>

      <Link
        to="/"
        className="bg-red-800 hover:bg-red-600 text-white px-6 py-3 rounded font-semibold text-lg"
      >
        {lang[currentLanguage].netflix_home}
      </Link>
      <p className="mt-4 text-gray-600 text-sm">
        {error?.statusText || error?.message}
      </p>
    </div>
  );
}
