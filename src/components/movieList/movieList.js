import React, { Component } from "react";
import './movieList.css';

class MovieList extends Component {

  render() {
    let data = this.props.data || [];
    const noImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQwgeZwy48tVBuhwGLh2Kgz55JSEi0rlyx1tiqVb7gqsaR4yqZa';
    const defaultImgPath = "https://image.tmdb.org/t/p/w500";

    return (
      <div className="movie-list">
        <ul>
          {data.map(movie => (
            <li key={movie.id} onClick={() => this.props.fetchMovieID(movie.id)}>
              <div className="movie-list__wrapper">
                <img src={movie.poster_path === null ? noImg : defaultImgPath+movie.poster_path} alt={movie.name} />
                <div className="movie-list__content">
                  <h4>{movie.title}</h4>
                  <p className="movie-list__rating">
                    <span>{movie.vote_average}</span>/10
                  </p>
                  <p className="movie-list__release">
                    Release Date:
                    <span>{movie.release_date}</span>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default MovieList;