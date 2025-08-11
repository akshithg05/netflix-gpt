export default function SuggestedMovieCard({ movie }) {
  return (
    <div className="bg-black p-4 flex items-start gap-4 rounded-lg">
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : "https://via.placeholder.com/150"
        }
        alt={movie.title}
        className="w-40 h-auto rounded-md flex-shrink-0"
      />

      <div className="flex flex-col justify-center text-left">
        <h3 className="text-white text-lg font-semibold">{movie.title}</h3>
        <p className="text-gray-400 text-m">{movie.release_date}</p>
        <p className="text-gray-400 text-m">{movie.overview}</p>
      </div>
    </div>
  );
}
