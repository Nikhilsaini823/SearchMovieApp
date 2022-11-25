import React, { useEffect, useState } from "react";

function Newsdetail() {
  const [NewsDetail, setNewsDetail] = useState({});

  useEffect(() => {
    fatchNewsDetails();
  }, []);

  const fatchNewsDetails = () => {
    fetch(
      "https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=f0769d206f134dd39fcce4846b238aab"
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.Error) {
          setNewsDetail([]);
        } else {
          setNewsDetail(result.articles);
        }
      });
  };

  return (
    <div>
      <div className="container ">
        <div className="row justify-content-center">
          <div className="col col-lg-6 mt-5">
            <div className="container text-center">
              <img src={NewsDetail.urlToImage} />
              <h1>{NewsDetail.title}</h1>
            </div>
            {/* <table class="table table-hover">
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
            </table> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Newsdetail;
