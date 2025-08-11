import { getTMDBImageUrl } from "../utils/api";

export default function MovieCard({ posterPath }) {
  return (
    <div className="w-48">
      <img alt="Movie card" src={getTMDBImageUrl(posterPath)} />
    </div>
  );
}
