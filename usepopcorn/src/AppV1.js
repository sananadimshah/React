import { useEffect, useState } from "react";
import StarRating from "./Star.js";
import "./index.css";
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "d3c15f96";
export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const handleAddList = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };
  const HandleSelectClick = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };

  const onCloseSelect = () => {
    setSelectedId(null);
  };

  const handleDeleteWatch = (id) => {
    setWatched((movies) => movies.filter((movie) => movie.imdbID !== id));
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("");
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signals: controller.signal }
        );
        if (!response.ok)
          throw new Error("Something went Wrong while fetching the data ");
        const data = await response.json();

        if (data.Response === "False") {
          throw new Error(
            data.Error || "Something went wrong while fetching the data"
          );
        }

        setMovies(data.Search || []);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query]);
  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />

        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loading />}
          {!error && !isLoading && (
            <MovieList movies={movies} selectedMovieId={HandleSelectClick} />
          )}
          {error && <Error message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseSelect={onCloseSelect}
              handleAddList={handleAddList}
              iswatched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchList watched={watched} onDeleteWatch={handleDeleteWatch} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Loading() {
  return (
    <div className="loader">
      <h1>Loading...</h1>
    </div>
  );
}

function MovieDetails({ selectedId, onCloseSelect, handleAddList, iswatched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const alreadyWatched = iswatched
    .map((movie) => movie.imdbID)
    .includes(selectedId);

  const watchedUserRating = iswatched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  // to handle with MovieList close Ecape Key events
  useEffect(() => {
    function callback(e) {
      if (e.code === "Escape") {
        onCloseSelect();
      }
    }
    document.addEventListener("keydown", callback);

    return function cleanup() {
      document.removeEventListener("keydown", callback);
    };
  });
  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return function () {
      document.title = "usePopcorn";
    };
  }, [title]);
  const handleAdd = () => {
    const newMovies = {
      imdbID: selectedId,
      title,
      year,
      poster,
      runtime: Number(runtime.split(" ").at(0)),
      imdbRating: Number(imdbRating),
      userRating,
    };
    handleAddList(newMovies);
    onCloseSelect();
  };
  useEffect(() => {
    const fetchMovieData = async () => {
      setIsLoading(true);
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );
      const data = await response.json();
      console.log(data);
      setMovie(data);
      setIsLoading(false);
    };
    fetchMovieData();
  }, [selectedId]);
  return (
    <div className="details">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseSelect}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!alreadyWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to Watched List
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this movie {watchedUserRating}
                  <span>⭐</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function Error({ message }) {
  return (
    <div className="error">
      <span>😭</span>
      {message}
    </div>
  );
}
function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function NumResults() {
  return (
    <p className="num-results">
      Found <strong>X</strong> results
    </p>
  );
}

function Navbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}
// function WatchedBox() {
//   const [watched, setWatched] = useState(tempWatchedData);

//   const [isOpen2, setIsOpen2] = useState(true);

//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen2((open) => !open)}
//       >
//         {isOpen2 ? "–" : "+"}
//       </button>
//       {isOpen2 && (
//         <>
//           <WatchedSummary watched={watched} />
//           <WatchList watched={watched} />
//         </>
//       )}
//     </div>
//   );
// }
function MovieList({ movies, selectedMovieId }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          selectedMovieId={selectedMovieId}
        />
      ))}
    </ul>
  );
}

function Movie({ movie, selectedMovieId }) {
  return (
    <li key={movie.imdbID} onClick={() => selectedMovieId(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>w<span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchList({ watched, onDeleteWatch }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <Watched
          movie={movie}
          key={movie.imdbID}
          onDeleteWatch={onDeleteWatch}
        />
      ))}
    </ul>
  );
}
function Watched({ movie, onDeleteWatch }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button
          className="btn-delete"
          onClick={() => onDeleteWatch(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
