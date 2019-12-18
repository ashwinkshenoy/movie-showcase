import React from "react"

import MovieItem from '../movieItem/movieItem'
import './movieList.css';

import emptyImg from '../../static/empty.svg';
import loaderImg from '../../static/loader.svg';

function MovieList(props) {
  
  const data = props.data || [];
  const loading = props.loading;
  
  const loader = () => {
    return (
      <div className="movie-list-loading">
        <img src={loaderImg} alt="loader" />
        <p>Loading...</p>
      </div>
    )
  }

  const noSearchData = () => {
    return (
      <div className="no-data">
        <img src={emptyImg} alt="no data found" />
        <p>Oops, No search data found!!</p>
      </div>
    )
  }


  return loading ? loader() : 
    data.length === 0 ? noSearchData() : 
    <MovieItem data={data} fetchMovieID={props.fetchMovieID.bind(this)} />;
}

export default MovieList;
