import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import './search.css';
import logo from '../../static/logo.svg';

import { queryMovie, setSearchData, setSearchValue, setLoading } from '../../actions/searchAction';
import { resetMovie } from '../../actions/movieActions';


function SearchBox() {
  const dispatch = useDispatch();
  const search = useSelector(state => state.search.searchValue);
  const debouncedSearchTerm = useDebounce(search, 500);
  
  const handleSearch = (e) => {
    if(e === "") {
      dispatch(setLoading(false))
      return;
    }
    dispatch(setLoading(true))
    dispatch(setSearchValue(e));
    dispatch(resetMovie());
    dispatch(setSearchData([]));
  }

  const queryMovieName = async (name) => {
    if(!name) return;
    dispatch(setSearchValue(name));
    dispatch(queryMovie(name));
  }

  // Effect for search API call 
  useEffect(() => {
    if (debouncedSearchTerm) {
      queryMovieName(debouncedSearchTerm)
    } else {
      dispatch(setSearchData([]));
    }
  // eslint-disable-next-line
  }, [debouncedSearchTerm]);

  return (
    <div className="movie-search">
      <img src={logo} alt="movies showcase logo" className="main-logo" />
      <form onSubmit={e => { e.preventDefault() }} id="movieSearch">
        <input
          onChange={(e) => handleSearch(e.target.value)}
          className="movie-search__input"
          type="text"
          placeholder="Search Movie Title..."
          id="search"
          autoComplete="off"
          aria-label="search"
        />
      </form>
    </div>
  );
}

export default SearchBox;


// Since not using custom npm pkgs, wrote debounce for search
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
}
