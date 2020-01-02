import React from "react";
import { useSelector, useDispatch } from 'react-redux';

import MovieItem from '../movieItem/movieItem'
import './movieList.css';

import emptyImg from '../../static/empty.svg';
import loaderImg from '../../static/loader.svg';

// Actions
import { fetchMovie } from '../../actions/movieActions'

function MovieList() {

  let data;
  const similar = useSelector(state => state.movie.similar || []);
  const search = useSelector(state => state.search.searchValue);
  const searchData = useSelector(state => state.search.searchData || []);
  const searchCast = useSelector(state => state.search.searchCast || {});
  const loading = useSelector(state => state.search.loading);
  const count = (!searchData.length > 0) ? 6 : null;
  const dispatch = useDispatch();
  const posterIMG = 'https://image.tmdb.org/t/p/w500';


  const fetchMovieId = async (movieID) => {
    await dispatch(fetchMovie(movieID));
    document.getElementById('movieSearch').reset();
  }

  data = searchData.length !== 0 ? searchData : similar
  
  const loader = () => {
    return (
      <div className="movie-list-loading">
        <img src={loaderImg} alt="loader" />
        <p>Loading...</p>
      </div>
    )
  }

  const noSearchData = () => {
    if(search && searchData.length === 0) {
      return (
        <div className="no-data">
          <img src={emptyImg} alt="no data found" />
          <p>Oops, No search data found!!</p>
        </div>
      )
    }
    return '';
  }

  const movieSearchTitle = () => {
    if(search || searchData.length > 0) {
      return (
        <h2 className="movie-search__title">
          { !search ? 
            <span className="search__cast">
              {searchCast.profile_path === null ? '' : <img src={posterIMG+searchCast.profile_path} alt={searchCast.name} />}
            </span> : ''
          }
          <span>
            { search ? <span>Searching for </span> : '' }
            <span className="highlight"> { search ? search : `${searchCast.name}` } </span>
            { search ? '' : <span> movies</span> }
          </span>
        </h2>
      )
    } else if(similar.length > 0) {
      return (
        <h2 className="movie-related__h2">Movies you may also like</h2>
      );
    } else {
      return '';
    }
  }


  return (
    <div className="movie-related">
      { movieSearchTitle() }
      {
        loading ? loader() : 
        data.length === 0 ? 
          noSearchData() : 
          <MovieItem data={data} fetchMovieID={ fetchMovieId } count={ count } />        
      }
    </div>
  )
}

export default MovieList;
