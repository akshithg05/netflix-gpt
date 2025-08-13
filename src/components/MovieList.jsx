import MovieCard from "./MovieCard";

export default function MovieList({ title, movies }) {
  return (
    <div className="lg:px-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl pb-4 sm-pb-2">{title}</h2>
      <div className="flex overflow-x-scroll no-scrollbar ">
        <div className="flex gap-4">
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
