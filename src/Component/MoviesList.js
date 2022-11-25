import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./MoviesList.css";

export default function MoviesList() {
  const [search, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [news, setNews] = useState([]);
  const [noMoviesFound, setNoMovieFound] = useState(false);
  const [newsUrl, setNewsUrl] = useState("");
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    if (search.length > 0) {
      fatchMovie(search);
    }
  }, []);

  useEffect(() => {
    fatchNews();
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

  const fatchNews = () => {
    fetch(
      "https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=f0769d206f134dd39fcce4846b238aab"
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.Error) {
          setNews([]);
        } else {
          setNews(result.articles);
        }
      });
  };

  const showNewsDetails = (event, url) => {
    console.log(url);
    setNewsUrl(url);
  };

  const renderNews = () => {
    return news.map((n) => {
      return (
        <div className="card-body" key={n.author}>
          <p className="setTitle col-10 text-truncate">{n.title}</p>
          <div className="imgSize">
            <img
              src={n.urlToImage == null ? "/image/news.jpg" : n.urlToImage}
              height="80%"
              width="90%"
            />
          </div>
          <p className="mt-3">Publish Date - {n.publishedAt}</p>
          <button
            className="btn btn-primary"
            onClick={(event) => showNewsDetails(event, n.url)}
          >
            Show Details
          </button>
        </div>
      );
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
      <div className="container">
        <h3>Top news </h3>
        <Carousel responsive={responsive}>{renderNews()}</Carousel>
      </div>
      {newsUrl.length > 0 && <iframe src={newsUrl} />}
    </div>
  );
}
