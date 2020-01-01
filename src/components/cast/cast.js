import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Fade from 'react-reveal/Fade';

import './cast.css';

// Actions
import { queryCast, setSearchCast } from '../../actions/searchAction';

function Cast() {

  let data = useSelector(state => state.movie.cast || []);
  const dispatch = useDispatch();
  const posterIMG = 'https://image.tmdb.org/t/p/w200';
  const noPosterIMG = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQwgeZwy48tVBuhwGLh2Kgz55JSEi0rlyx1tiqVb7gqsaR4yqZa';

  if(data) {
    data = data.slice(0, 10)
  }

  const fetchByCastId = (cast) => {
    const {id} = cast;
    if(!id) return;
    dispatch(setSearchCast(cast));
    dispatch(queryCast(id));
  }

  return (
    <div className="movie-cast">
      <h2>Leading Cast</h2>
      <Fade bottom cascade duration={1000} distance="100px">
        <ul className="movie-cast-list">
          {data.map(cast => (
            <li key={cast.id} onClick={ () => fetchByCastId(cast) }>
              <img src={cast.profile_path === null ? noPosterIMG : posterIMG+cast.profile_path} alt={cast.name} />
              <p className="movie-cast__name">{cast.name}</p>
            </li>
          ))}
        </ul>
      </Fade>
    </div>
  )
}

export default Cast
