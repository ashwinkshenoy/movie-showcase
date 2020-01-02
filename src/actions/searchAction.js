import { setMovie } from './movieActions';

const key = process.env.REACT_APP_MOVIE_DB_KEY;

export const queryMovie = (movieName) => {
  return async (dispatch) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=${key}`
    const data = await fetch(url).then((res) => res.json());    
    await dispatch(setSearchData(data.results))
    dispatch(setMovie({}));
    dispatch(setLoading(false));
  }
}

export const queryCast = (castId) => {
  return async (dispatch) => {
    const url = `https://api.themoviedb.org/3/person/${castId}/movie_credits?api_key=${key}`
    const data = await fetch(url).then((res) => res.json());
    await dispatch(setSearchData(data.cast))
    dispatch(setMovie({}));
    dispatch(setLoading(false));
  }
}

export const setSearchData = (searchData) => {
  return {
    type: 'SEARCHDATA',
    payload: searchData
  }
}

export const setSearchCast = (castData) => {
  return {
    type: 'SEARCHCAST',
    payload: castData
  }
}

export const setSearchValue = (value) => {
  return {
    type: 'SEARCHVALUE',
    payload: value
  }
}

export const setLoading = (value) => {
  return {
    type: 'SEARCHLOADING',
    payload: value
  }
}

export const resetSearch = () => {
  return {
    type: 'RESETSEARCH'
  }
}
