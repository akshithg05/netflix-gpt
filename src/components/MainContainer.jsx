import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

export default function MainContainer({ nowPlayingMovies }) {
  const mainMovie = nowPlayingMovies?.[0] || {};
  const { original_title, overview, id } = mainMovie || {};

  return (
    <div className="pt-[40%] sm:pt-[25%] md:pt-0 bg-black pb-12 md:pb-20">
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
}
