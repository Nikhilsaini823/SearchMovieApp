import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function MoviesList() {
  const [search, setSearchTerm] = useState(" ");
  const [movies, setMovies] = useState([]);
  const [noMoviesFound, setNoMovieFound] = useState(false);

  useEffect(() => {
    let term = localStorage.getItem("searchTerm");
    if (term) {
      fatchMovie(term);
    }
  }, []);

  const hendleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const cleraResult = () => {
    setMovies([]);
    setSearchTerm("");
    localStorage.removeItem("searchTerm");
  };

  const fatchMovie = (movieName) => {
    const searchURL = `https://www.omdbapi.com/?s=${movieName}&apikey=1f4f072a`;

    localStorage.setItem("searchTerm", movieName);

    fetch(searchURL)
      .then((response) => response.json())
      .then((result) => {
        if (result.Error) {
          setMovies([]);
          setNoMovieFound(true);
        } else {
          setMovies(result.Search);
          setNoMovieFound(false);
        }
      });
  };

  const movieItems = movies.map((movie) => {
    return (
      <div key={movie.imdbID}>
        <div class="col">
          <div class="card shadow-sm">
            <img
              src={
                movie.Poster == "N/A" ? "/missingmovieposter.jpg" : movie.Poster
              }
              class="bd-placeholder-img card-img-top"
            />

            <div class="card-body">
              <h2> {movie.Title} </h2>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <NavLink to={`/${movie.imdbID}`}>
                    <button
                      className="mb-3"
                      class="btn btn-sm btn-outline-secondary"
                    >
                      Show Details
                    </button>
                  </NavLink>
                </div>
                <small class="text-muted">{movie.Year}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <section class="py-5 text-center container">
        <div class="row py-lg-5">
          <div class="col-lg-6 col-md-8 mx-auto">
            <h1 class="fw-light">Movie Search</h1>
            <p class="lead text-muted">
              we want to help you find the right movie. Start a search and see
              what you'll be watching tonighi :D
              <p>
                <input
                  type="text"
                  onChange={hendleSearchTermChange}
                  placeholder="ex.Superman"
                />
              </p>
            </p>
            <p>
              <button
                onClick={() => fatchMovie(search)}
                class="btn btn-primary my-2 me-3"
              >
                {" "}
                Search
              </button>
              <button onClick={cleraResult} class="btn btn-secondary my-2">
                Clear Results{" "}
              </button>
            </p>
          </div>
        </div>
      </section>
      <div class="album py-5 bg-light">
        <div class="container">
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {movieItems}
          </div>
        </div>
      </div>
      {noMoviesFound ? <h1>No movies found</h1> : null}
    </div>
  );
}
