import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

export default function MainContainer({ nowPlayingMovies }) {
  const mainMovie = nowPlayingMovies?.[0] || {};

  const { original_title, overview, backdrop_path, id } = mainMovie || {};
  return (
    <div className="pt-[30%] bg-black md:pt-0 ">
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
}
