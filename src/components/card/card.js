import React, { useEffect } from 'react';
import MovieItem from '../movieItem/movieItem'

import './card.css'

function Card(props) {

  // Effect to scrool only on props change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [props]);


  const data = props.data || {}
  
  let posterIMG = 'https://image.tmdb.org/t/p/w500' + data.poster,
      production = data.production,
      genres = data.genre,
      totalRevenue = data.revenue,
      productionList = nestedDataToString(production),
      noData = '-',
      genresList = nestedDataToString(genres),
      backdropImg = 'https://image.tmdb.org/t/p/original' + data.backdrop;

  // conditional statements for no data
  if (data.vote === 'undefined' || data.vote === 0) {
    data.vote = noData
  }

  if (totalRevenue === 'undefined' || totalRevenue === 0) {
    totalRevenue = noData
  } else {
    totalRevenue = data.revenue && '$' + data.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if(data.poster== null){
    posterIMG = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQwgeZwy48tVBuhwGLh2Kgz55JSEi0rlyx1tiqVb7gqsaR4yqZa';
  }

  return (
    <>
      {/* Main Card Content */}
      <div className="movie-card">
        <div className="movie-card__backdrop">
          {data.backdrop === null ? '' : <img src={backdropImg} alt={data.title} />}
        </div>

        <div className="movie-card-main">
          <div className="movie-card__poster">
            <img src={posterIMG} alt={data.title} />
          </div>
          <div className="movie-card__content">
            <h1>{data.original_title}</h1>
            <span className="movie-card__tagline">{data.tagline}</span>
            <p className="movie-card__overview">{data.overview}</p>
            <p className="movie-card__genre">{genresList}</p>
            <p className="movie-card__production">{productionList}</p>
            
            <div className="movie-card__row">
              <div className="movie-card__col">
                Original Release: <span className="meta-data">{data.release}</span>
              </div>
              <div className="movie-card__col">
                Running Time: <span className="meta-data">{convertMinsToHrsMins(data.runtime)}</span>
              </div>
              <div className="movie-card__col">
                Vote Average: <span className="meta-data">{data.vote} / 10</span>
              </div>
              <div className="movie-card__col">
                Box Office: <span className="meta-data">{totalRevenue}</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Related Movies */}
      <div className="movie-related">
        {data.similar && data.similar.length > 0 ? <h2>Movies you may also like</h2> : ''}
        <MovieItem data={data.similar} fetchMovieID={props.fetchMovieID} count={6} />
      </div>
    </>
  )

}


function nestedDataToString(nestedData) {
  let nestedArray = [], resultString;
  if(nestedData !== undefined){
    nestedData.forEach(function(item){
      nestedArray.push(item.name);
    });
  }
  resultString = nestedArray.join(', ');
  return resultString;
};

function convertMinsToHrsMins(mins) {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;
  return `${h} ${h > 1 ? 'hrs': 'hr'} ${m} ${m > 1 ? 'mins' : 'min'}`;
}

export default Card;
