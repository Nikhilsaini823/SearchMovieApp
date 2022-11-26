import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import "./MoviesList.css";

export default function MoviesList() {
  const [search, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [noMoviesFound, setNoMovieFound] = useState(false);

  useEffect(() => {
    if (search.length > 0) {
      fatchMovie(search);
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
        <div className="col">
          <div className="card shadow-sm">
            <img
              src={
                movie.Poster == "N/A"
                  ? "/image/missingmovieposter.jpg"
                  : movie.Poster
              }
              className="bd-placeholder-img card-img-top"
            />

            <div className="card-body">
              <h2> {movie.Title} </h2>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <NavLink to={`/${movie.imdbID}`}>
                    <button className="btn btn-sm btn-outline-secondary mb-3">
                      Show Details
                    </button>
                  </NavLink>
                </div>
                <small className="text-muted">{movie.Year}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Movie Search</h1>
            <p className="lead text-muted">
              we want to help you find the right movie. Start a search and see
              what you'll be watching tonight :D
              <br />
              <input
                type="text"
                onChange={hendleSearchTermChange}
                placeholder="ex.Superman"
              />
            </p>

            <p>
              <button
                onClick={() => fatchMovie(search)}
                className="btn btn-primary my-2 me-3"
              >
                {" "}
                Search
              </button>
              <button onClick={cleraResult} className="btn btn-secondary my-2">
                Clear Results{" "}
              </button>
            </p>
          </div>
        </div>
      </section>
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {movieItems}
          </div>
        </div>
      </div>
      {noMoviesFound ? <h1>No movies found</h1> : null}
    </div>
  );
}
