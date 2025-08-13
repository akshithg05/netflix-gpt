import { useState } from "react";
import TrailerModal from "./TrailerModal";

export default function SuggestedMovieCard({ movie }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(true);
  }
  return (
    <div>
      <button
        onClick={handleClick}
        className="hover:bg-gray-800 bg-black rounded-lg cursor-pointer"
      >
        <div className=" p-4 flex items-start gap-4 ">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : "https://via.placeholder.com/150"
            }
            alt={movie.title}
            className="w-24 sm:w-28 md:w-32 lg:w-40 h-auto rounded-md flex-shrink-0"
          />

          <div className="flex flex-col justify-center text-left">
            <h3 className="text-white text-base sm:text-lg font-semibold">
              {movie.title}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              {movie.release_date}
            </p>
            <p className="text-gray-400 text-sm sm:text-base line-clamp-5">
              {movie.overview}
            </p>
          </div>
        </div>
      </button>
      {isOpen && <TrailerModal movie={movie} setIsOpen={setIsOpen} />}
    </div>
  );
}
