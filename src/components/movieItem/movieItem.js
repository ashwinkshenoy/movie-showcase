import React from 'react';
import Fade from 'react-reveal/Fade';

import './movieItem.css';

import noPoster from '../../static/no-poster.svg'

const noImg = noPoster;
const defaultImgPath = "https://image.tmdb.org/t/p/w500";

function MovieList(props) {
  let data = props.data || [];   

  if(props.count) {
    data = data.slice(0, props.count)
  }
  
  return (
    <div className="movie-list">
      <Fade bottom cascade duration={1000} distance="100px">  
        <ul>
          {data.map(movie => (
              <li key={movie.id} onClick={() => props.fetchMovieID(movie.id)}>
                <div className="movie-list__wrapper">
                  <img src={movie.poster_path === null ? noImg : defaultImgPath+movie.poster_path} alt={movie.name} />
                  <div className="movie-list__content">
                    <h4>{movie.title}</h4>
                    <p className="movie-list__rating">
                      <span>{movie.vote_average}</span>/10
                    </p>
                    <p className="movie-list__release">
                      Release Date:
                      <span>{movie.release_date}</span>
                    </p>
                  </div>
                </div>
              </li>
          ))}
        </ul>
      </Fade>
    </div>
  )
}

export default MovieList;
