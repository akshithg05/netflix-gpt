import { getTMDBImageUrl } from "../utils/api";

export default function MovieCard({ posterPath }) {
  return (
    <div className="w-24 sm:w-32 md:w-40 lg:w-48">
      <img
        alt="Movie card"
        src={getTMDBImageUrl(posterPath)}
        className="w-full h-auto rounded"
      />
    </div>
  );
}
