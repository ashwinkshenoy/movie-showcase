import React from 'react';

import './movieItem.css';

const noImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQwgeZwy48tVBuhwGLh2Kgz55JSEi0rlyx1tiqVb7gqsaR4yqZa';
const defaultImgPath = "https://image.tmdb.org/t/p/w500";

function MovieList(props) {
  let data = props.data || [];   

  if(props.count) {
    data = data.slice(0, props.count)
  }
  
  return (
    <div className="movie-list">
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
    </div>
  )
}

export default MovieList;
