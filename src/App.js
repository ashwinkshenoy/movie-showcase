import React, { useState, useEffect } from 'react';


// Components
import SearchBox from './components/search/search.js';
import MovieList from './components/movieList/movieList.js';
import Card from './components/card/card.js';
import Cast from './components/cast/cast.js';

// Basic Stying
import './App.css';

const key = process.env.REACT_APP_MOVIE_DB_KEY;

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


function App() {

  const [movieId] = useState(299534);
  const [movie, setMovie] = useState([]);
  const [search, setSearch] = useState(null);
  const [searchCast, setSearchCast] = useState({});
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(search, 500);
  const posterIMG = 'https://image.tmdb.org/t/p/w500';

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
      similar: data.similar.results,
      cast: data.credits.cast
    })
    setSearch(null)
    setSearchData([])
    // Reset search form
    document.getElementById('movieSearch').reset();   
  }

  const fetchMovieID = (movieID) => {
    const url = `https://api.themoviedb.org/3/movie/${movieID}?&api_key=${key}&append_to_response=similar,credits,videos`
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

  const fetchByCastId = async (cast) => {
    const {id} = cast;
    if(!id) return;
    setSearchCast(cast);
    const url = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${key}`;
    const data = await fetch(url).then((res) => res.json());
    setSearchData(data.cast);
    setLoading(false);
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
  }, [debouncedSearchTerm]);

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
          { search ? <span>Searching for </span> : '' }
          <span className="highlight"> { search ? search : `${searchCast.name}` } </span>
          <span> { search ? '' : 'movies' }</span>
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
      <SearchBox handleSearch={handleSearch} />
      { search || searchData.length > 0 ?
        <>
          {movieRelatedSearch(searchData)}
        </> :
        <>
          <Card data={movie} />
          <Cast data={movie.cast} fetchByCastId={fetchByCastId}/>
          {movieRelatedSearch(movie.similar)}
        </>
      }

      <footer className="ashwin">Crafted with <span role="img" aria-label="heart">❤️</span></footer>
    </div>
  )
}

export default App;
