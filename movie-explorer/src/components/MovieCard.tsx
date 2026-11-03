import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
}

function MovieCard({ movie, onSelect }: MovieCardProps) {
  return (
    <button
      type="button"
      className="movie-card"
      onClick={() => onSelect(movie)}
      aria-label={`View details for ${movie.title}`}
    >
      <div className="movie-poster-wrapper">
        <img
          className="movie-poster"
          src={movie.poster}
          alt={`${movie.title} poster`}
          loading="lazy"
        />

        <span className="movie-rating">
          ★ {movie.rating.toFixed(1)}
        </span>
      </div>

      <div className="movie-card-info">
        <h3>{movie.title}</h3>

        <div className="movie-meta">
          <span>{movie.year}</span>
          <span>{movie.genre}</span>
        </div>
      </div>
    </button>
  );
}

export default MovieCard;