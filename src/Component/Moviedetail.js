import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Moviedetail() {
  const [movieDetail, setMovieDetail] = useState({});

  const params = useParams();

  useEffect(() => {
    const imdbId = params.imdbId;
    console.log(imdbId);
    fetchMovieDetails(imdbId);
  }, []);

  const fetchMovieDetails = (imdbId) => {
    const movieDetailsUrl = `https://www.omdbapi.com/?i=${imdbId}&apiKey=1f4f072a`;
    fetch(movieDetailsUrl)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setMovieDetail(result);
      });
  };

  return (
    <div>
      <div className="container ">
        <div className="row justify-content-center">
          <div className="col col-lg-6 mt-5">
            <div className="container text-center">
              <img src={movieDetail.Poster} />
              <h1>{movieDetail.Title}</h1>
            </div>
            <table class="table table-hover">
              <tbody>
                <tr>
                  <th scope="row">Plot</th>
                  <td>{movieDetail.Plot}</td>
                </tr>
                <tr>
                  <th scope="row">Director</th>
                  <td>{movieDetail.Director}</td>
                </tr>
                <tr>
                  <th scope="row">Writer</th>
                  <td>{movieDetail.Writer}</td>
                </tr>
                <tr>
                  <th scope="row">Year</th>
                  <td>{movieDetail.Year}</td>
                </tr>
                <tr>
                  <th scope="row">Rating</th>
                  <td>{movieDetail.imdbRating}</td>
                </tr>
                <tr>
                  <th scope="row">Votes</th>
                  <td>{movieDetail.imdbVotes}</td>
                </tr>
                <tr>
                  <th scope="row">Actors</th>
                  <td>{movieDetail.Actors}</td>
                </tr>
                <tr>
                  <th scope="row">Earning</th>
                  <td>{movieDetail.BoxOffice}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Moviedetail;
