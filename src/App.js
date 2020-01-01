import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Basic Stying
import './App.css';

// Components
import SearchBox from './components/search/search.js';
import MovieList from './components/movieList/movieList.js';
import Card from './components/card/card.js';
import Cast from './components/cast/cast.js';
import Videos from './components/videos/videos.js';

// Action
import { fetchMovie } from './actions/movieActions';
import { setSearch } from './actions/searchAction';


function App() {
  const [movieId] = useState(299534);  
  const movie = useSelector(state => state.movie);
  const search = useSelector(state => state.search.searchValue);
  const searchData = useSelector(state => state.search.searchData);
  const searchCast = useSelector(state => state.search.searchCast);
  const loading = useSelector(state => state.search.loading);
  const dispatch = useDispatch();  
  const posterIMG = 'https://image.tmdb.org/t/p/w500';

  const fetchMovieID = async (movieID) => {
    await dispatch(fetchMovie(movieID));
    dispatch(setSearch(null));
    document.getElementById('movieSearch').reset();
  }

  // Effect on mounted
  useEffect(() => {
    fetchMovieID(movieId)
  // eslint-disable-next-line
  }, [movieId]);


  // Effect to scroll only on props change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [movie, searchData]);


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
    } else {
      return (
        <h2 className="movie-related__h2">Movies you may also like</h2>
      )
    }
  }


  const movieRelatedSearch = (data) => {
    return (
      <div className="movie-related">
        { movieSearchTitle() }
        <MovieList
          data={data}
          fetchMovieID={fetchMovieID}
          count={!searchData.length > 0 ? 6 : null}
          loading={loading} 
        />
      </div>
    )
  }


  return (
    <div className="container">
      <SearchBox />
      { search || searchData.length > 0 ?
        <>
          {movieRelatedSearch(searchData)}
        </> :
        <>
          <Card />
          <Videos />
          <Cast />
          {movieRelatedSearch(movie.similar)}
        </>
      }

      <footer className="ashwin">Crafted with <span role="img" aria-label="heart">❤️</span></footer>
    </div>
  )
}

export default App;
