import type { Movie } from "../types/movie";
import MovieCard from "./MovieCard";

interface MovieGridProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
}

function MovieGrid({ movies, onSelectMovie }: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <p className="empty-state">
        No movies found. Try another search.
      </p>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onSelect={onSelectMovie}
        />
      ))}
    </div>
  );
}

export default MovieGrid;