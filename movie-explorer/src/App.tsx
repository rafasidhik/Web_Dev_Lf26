import { useMemo, useState } from "react";
import MovieGrid from "./components/MovieGrid";
import MovieDetails from "./components/MovieDetails";
import { movies } from "./data/movies";
import type { Movie } from "./types/movie";

function App() {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const genres = useMemo(
    () => ["All", ...new Set(movies.map((movie) => movie.genre))],
    [],
  );

  const filteredMovies = useMemo(() => {
    const query = search.trim().toLowerCase();

    return movies.filter((movie) => {
      const matchesSearch =
        movie.title.toLowerCase().includes(query) ||
        movie.genre.toLowerCase().includes(query) ||
        movie.director.toLowerCase().includes(query);

      const matchesGenre =
        selectedGenre === "All" || movie.genre === selectedGenre;

      return matchesSearch && matchesGenre;
    });
  }, [search, selectedGenre]);

  return (
    <main className="app">
      <header className="site-header">
        <a className="brand" href="/" aria-label="MovieVerse home">
          <span className="brand-icon">M</span>
          <span>Movie<span className="brand-accent">Verse</span></span>
        </a>

        <span className="header-tagline">YOUR NEXT MOVIE AWAITS</span>
      </header>

      <section className="hero">
        <p className="eyebrow">THE WORLD OF CINEMA</p>
        <h1>
          Find your next
          <br />
          <span>favourite film.</span>
        </h1>
        <p className="hero-description">
          Explore memorable stories, discover new favourites,
          and find something worth watching.
        </p>

        <div className="search-bar">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            placeholder="Search movies, genres or directors..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search movies"
          />
        </div>
      </section>

      <section className="catalog" aria-label="Movie catalogue">
        <div className="catalog-heading">
          <div>
            <p className="eyebrow">CURATED FOR YOU</p>
            <h2>Explore movies</h2>
          </div>
          <p className="movie-count">
            {filteredMovies.length} {filteredMovies.length === 1 ? "movie" : "movies"}
          </p>
        </div>

        <div className="genre-filters" aria-label="Filter by genre">
          {genres.map((genre) => (
            <button
              key={genre}
              type="button"
              className={`genre-chip ${selectedGenre === genre ? "active" : ""}`}
              onClick={() => setSelectedGenre(genre)}
              aria-pressed={selectedGenre === genre}
            >
              {genre}
            </button>
          ))}
        </div>

        <MovieGrid
          movies={filteredMovies}
          onSelectMovie={setSelectedMovie}
        />
      </section>

      <footer className="site-footer">
        <a className="brand footer-brand" href="/">
          <span className="brand-icon">M</span>
          <span>Movie<span className="brand-accent">Verse</span></span>
        </a>
        <p>A little more cinema in your day.</p>
        <span>Built with React & TypeScript</span>
      </footer>

      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </main>
  );
}

export default App;