import { resetSearch } from './searchAction';

const key = process.env.REACT_APP_MOVIE_DB_KEY;

export const fetchMovie = (movieId) => {
  return async (dispatch) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?&api_key=${key}&append_to_response=similar,credits,videos`;
    const data =  await fetchApi(url);
    dispatch(setMovie(data));
    dispatch(resetSearch());
  }
}

export const setMovie = (movieData) => {
  return {
    type: 'ADDMOVIE',
    payload: movieData
  }
}

// Default Api fetch function
async function fetchApi(url) {
  const data = await fetch(url).then((res) => res.json());
  return {
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
    cast: data.credits.cast,
    videos: data.videos.results,
  }
}
