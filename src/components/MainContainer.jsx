import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

export default function MainContainer({ nowPlayingMovies }) {
  const mainMovie = nowPlayingMovies?.results?.[0];

  const { original_title, overview, backdrop_path, id } = mainMovie || {};
  return (
    <div>
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
}
