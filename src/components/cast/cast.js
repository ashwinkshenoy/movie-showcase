import React from 'react';
import './cast.css';

function cast(props) {

  let data = props.data || []

  if(data) {
    data = data.slice(0, 10)
  }

  const posterIMG = 'https://image.tmdb.org/t/p/w200';

  const noPosterIMG = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQwgeZwy48tVBuhwGLh2Kgz55JSEi0rlyx1tiqVb7gqsaR4yqZa';
  
  return (
    <div className="movie-cast">
      <h2>Leading Cast</h2>
      <ul className="movie-cast-list">
        {data.map(cast => (
          <li key={cast.id} onClick={ () => props.fetchByCastId(cast) }>
            <img src={cast.profile_path === null ? noPosterIMG : posterIMG+cast.profile_path} alt={cast.name} />
            <p className="movie-cast__name">{cast.name}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default cast
