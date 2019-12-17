import React, { Component } from "react"
import emptyImg from '../../static/empty.svg';
import loader from '../../static/loader.svg';
import './movieList.css';

const noImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQwgeZwy48tVBuhwGLh2Kgz55JSEi0rlyx1tiqVb7gqsaR4yqZa';
const defaultImgPath = "https://image.tmdb.org/t/p/w500";

class MovieList extends Component {
  
  searchData(data) {
    return (
      <div className="movie-list">
        <ul>
          {data.map(movie => (
            <li key={movie.id} onClick={() => this.props.fetchMovieID(movie.id)}>
              <div className="movie-list__wrapper">
                <img src={movie.poster_path === null ? noImg : defaultImgPath+movie.poster_path} alt={movie.name} loading="lazy" />
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
    )
  }

  noSearchData() {
    return (
      <div className="no-data">
        <img src={emptyImg} alt="no data found" />
        <p>Oops, No search data found!!</p>
      </div>
    )
  }
  
  render() {
    let data = this.props.data || [];
    const loading = this.props.loading;
    if(loading) {
      return (
        <div className="movie-list-loading">
          <img src={loader} alt="loader" />
          <p>Loading...</p>
        </div>
      )
    } else {
      return data.length === 0 ? this.noSearchData() : this.searchData(data);
    }
  }
}

export default MovieList;
