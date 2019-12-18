import React from "react";
import logo from '../../static/logo.svg';
import './search.css';


function SearchBox(props) {
  return (
    <div className="movie-search">
      <img src={logo} alt="movies showcase logo" className="main-logo" />
      <form onSubmit={e => { e.preventDefault(); }} id="movieSearch">
        <input
          onChange={(e) => props.handleSearch(e.target.value)}
          className="movie-search__input"
          type="text"
          placeholder="Search Movie Title..."
          id="search"
          autoComplete="off"
        />
      </form>
    </div>
  );
}

export default SearchBox;
