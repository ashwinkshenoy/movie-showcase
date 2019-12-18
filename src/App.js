import React, { useState, useEffect } from 'react';

// Components
import SearchBox from './components/search/search.js';
import MovieList from './components/movieList/movieList.js';
import Card from './components/card/card.js';

// Basic Stying
import './App.css';

const key = process.env.REACT_APP_MOVIE_DB_KEY;

function App() {

  const [movieId] = useState(24428);
  const [movie, setMovie] = useState([]);
  const [search, setSearch] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const [loading, setLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(search, 500);

  // the api request function
  const fetchApi = async (url) => {
    const data = await fetch(url).then((res) => res.json());
    setMovie({
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
      similar: data.similar.results
    })
    setSearch(null)
    setSearchData([])
    // Reset search form
    document.getElementById('movieSearch').reset();   
  }

  const fetchMovieID = (movieID) => {
    const url = `https://api.themoviedb.org/3/movie/${movieID}?&api_key=${key}&append_to_response=similar`
    fetchApi(url)
  }

  const queryMovieID = async (name) => {
    if(!name) return;
    setSearch(name)
    const url = `https://api.themoviedb.org/3/search/movie?query=${name}&api_key=${key}`
    const data = await fetch(url).then((res) => res.json());
    setSearchData(data.results)
    setLoading(false)
  }

  const handleSearch = (e) => {
    if(e === "") {
      setLoading(false)
      return;
    }
    setLoading(true)
    setSearch(e)
  }

  // Effect on mounted
  useEffect(() => {
    fetchMovieID(movieId)
  // eslint-disable-next-line
  }, [movieId]);

  // Effect for search API call 
  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true);
      queryMovieID(debouncedSearchTerm)
    } else {
      setSearchData([]);
    }
  }, [debouncedSearchTerm]); // Only call effect if debounced search term changes

  // Effect to scroll only on props change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [movie]);

  return (
    <div className="container">
      <SearchBox handleSearch={handleSearch.bind(this)} />
      {search ? 
        <MovieList data={searchData} fetchMovieID={fetchMovieID.bind(this)} loading={loading} /> : 
        <Card data={movie} fetchMovieID={fetchMovieID.bind(this)} />
      }
      <footer className="ashwin">Crafted with <span role="img" aria-label="heart">❤️</span></footer>
    </div>
  )
}

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

export default App;
