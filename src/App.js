import React, { Component } from 'react';

// Components
import SearchBox from './components/search/search.js';
import MovieList from './components/movieList/movieList.js';
import Card from './components/card/card.js';

// Basic Stying
import './App.css';

const key = '8669a80875d5423ff1d26a31a3a4c2db';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      movieID: 24428, // set initital load movie - Avengers
      search: null
    }
    this.delayedCallback = debounce(this.queryMovieID, 500);
  }

  // the api request function
  fetchApi(url) {
    fetch(url).then((res) => res.json()).then((data) => {
      // update state with API data
      this.setState({
        movieID: data.id,
        original_title: data.original_title,
        title: data.title,
        tagline: data.tagline,
        overview: data.overview,
        homepage: data.homepage,
        poster: data.poster_path,
        production: data.production_companies,
        production_countries: data.production_countries,
        genre: data.genres,
        release: data.release_date,
        vote: data.vote_average,
        runtime: data.runtime,
        revenue: data.revenue,
        backdrop: data.backdrop_path,
        search: null,
        searchData: []
      })
    })
    // Reset search form
    document.getElementById('movieSearch').reset();
  }

  fetchMovieID(movieID) {
    let url = `https://api.themoviedb.org/3/movie/${movieID}?&api_key=${key}&append_to_response=videos,images`
    this.fetchApi(url)
  }

  queryMovieID(name) {
    if(!name) return;
    this.setState(() => ({ search: name }));
    let url = `https://api.themoviedb.org/3/search/movie?query=${name}&api_key=${key}`
    fetch(url).then((res) => res.json()).then((data) => {
      // update state with API data
      this.setState({
        searchData: data.results
      })
    });
  }

  componentDidMount() {
    let url = `https://api.themoviedb.org/3/movie/${this.state.movieID}?&api_key=${key}&append_to_response=videos,images`
    this.fetchApi(url)
  }

  handleSearch(e) {
    this.delayedCallback(e)
  }

  render() {
    return (
      <div className="container">
        <SearchBox handleSearch={this.handleSearch.bind(this)} handleSubmit={this.handleSubmit}/>
        {this.state.search ? 
          <MovieList data={this.state.searchData} fetchMovieID={this.fetchMovieID.bind(this)} /> : 
          <Card data={this.state}/>
        }
        <footer>Crafted with <span role="img" aria-label="heart">❤️</span></footer>
      </div>
    )
  }
}

// Since no npm pkgs, wrote debounce for search
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

export default App;
