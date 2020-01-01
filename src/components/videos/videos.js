import React from 'react';
import { useSelector } from 'react-redux';

import './videos.css';

function Videos() {
  let data = useSelector(state => state.movie.videos || [])

  if(data.length >= 4) {
    data = data.slice(0, 3)
  }
  return (
    <div className="movie-video">
      <h2>Trailers / Videos</h2>

      <ul>
        { data.map(video => (
          <li key={video.id}>
            <iframe width="100%" height={data.length <=2 ? '300px' : '250px'} src={`https://www.youtube.com/embed/${video.key}`} allow="picture-in-picture" allowFullScreen="allowFullScreen" frameBorder="0" title={video.name}></iframe>
          </li>
        )) }
      </ul>
    </div>
  )
}

export default Videos
