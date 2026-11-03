import type { Movie } from "../types/movie";

interface MovieDetailsProps {
  movie: Movie;
  onClose: () => void;
}

function MovieDetails({ movie, onClose }: MovieDetailsProps) {
  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <section
        className="movie-details"
        role="dialog"
        aria-modal="true"
        aria-labelledby="movie-details-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="close-button"
          onClick={onClose}
          aria-label="Close movie details"
        >
          ×
        </button>

        <img
          className="details-poster"
          src={movie.poster}
          alt={`${movie.title} poster`}
        />

        <div className="details-content">
          <p className="details-label">MOVIE DETAILS</p>

          <h2 id="movie-details-title">{movie.title}</h2>

          <div className="details-meta">
            <span>{movie.year}</span>
            <span>{movie.duration}</span>
            <span>{movie.genre}</span>
            <span>★ {movie.rating.toFixed(1)}</span>
          </div>

          <h3>Overview</h3>
          <p className="movie-overview">{movie.overview}</p>

          <h3>Director</h3>
          <p>{movie.director}</p>

          <button
            type="button"
            className="back-button"
            onClick={onClose}
          >
            Back to movies
          </button>
        </div>
      </section>
    </div>
  );
}

export default MovieDetails;