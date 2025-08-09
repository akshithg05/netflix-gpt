import MovieCard from "./MovieCard";

export default function MovieList({ title, movies }) {
  return (
    <div className="px-6">
      <h2 className="text-3xl py-4">{title}</h2>
      <div className="flex overflow-x-scroll no-scrollbar ">
        <div className="flex gap-4 scrollbar-hide">
          {movies?.map((movie) => {
            return (
              <MovieCard key={movie?.id} posterPath={movie?.poster_path} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
