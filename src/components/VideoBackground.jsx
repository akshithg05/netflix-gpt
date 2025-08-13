import useMovieTrailer from "../hooks/useMovieTrailer";

export default function VideoBackground({ movieId }) {
  // fetch movie trailer or background video using movieId'
  const trailerVideo = useMovieTrailer(movieId);

  return (
    <div className="w-screen">
      <iframe
        className="w-full aspect-video"
        src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1&rel=0`}
        title="YouTube video player"
        allow="autoplay"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
}
