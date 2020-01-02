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
  const dispatch = useDispatch();  

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


  return (
    <div className="container">
      <SearchBox />
      { search || searchData.length > 0 ?
        <MovieList /> :
        <>
          <Card />
          <Videos />
          <Cast />
          <MovieList />
        </>
      }

      <footer className="ashwin">Crafted with <span role="img" aria-label="heart">❤️</span></footer>
    </div>
  )
}

export default App;
