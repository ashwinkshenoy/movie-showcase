import React, { Component } from "react";
import './search.css';

class SearchBox extends Component {

  render() {
    return (
      <div className="movie-search">
        <form>
          <input
            ref="search suggestion"
            onChange={(e) => this.props.handleSearch(e.target.value)}
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
}

export default SearchBox;
