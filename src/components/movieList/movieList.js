import React, { Component } from "react"

import MovieItem from '../movieItem/movieItem'
import './movieList.css';

import emptyImg from '../../static/empty.svg';
import loader from '../../static/loader.svg';


class MovieList extends Component {

  noSearchData() {
    return (
      <div className="no-data">
        <img src={emptyImg} alt="no data found" />
        <p>Oops, No search data found!!</p>
      </div>
    )
  }

  loader() {
    return (
      <div className="movie-list-loading">
        <img src={loader} alt="loader" />
        <p>Loading...</p>
      </div>
    )
  }
  
  render() {
    let data = this.props.data || [];
    const loading = this.props.loading;

    return loading ? this.loader() : 
      data.length === 0 ? this.noSearchData() : 
      <MovieItem data={data} fetchMovieID={this.props.fetchMovieID.bind(this)} />;
  }
}

export default MovieList;
