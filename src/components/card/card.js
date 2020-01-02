import React from 'react';
import { useSelector } from 'react-redux'
import Fade from 'react-reveal/Fade';

import './card.css'

import imdbLogo from '../../static/imdbLogo.svg'
import noPoster from '../../static/no-poster.svg'

function Card() {

  const data = useSelector(state => state.movie)
  
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
    posterIMG = noPoster;
  }

  return (
    <>
      {/* Main Card Content */}
      <div className="movie-card">
        <div className="movie-card__backdrop">
          <Fade duration={1000} distance="30px"> 
            {data.backdrop === null ? '' : <img src={backdropImg} alt={data.title} />}
          </Fade>
        </div>

        <div className="movie-card-main">
          <div className="movie-card__poster">
            <Fade left duration={1000} distance="30px"> 
              <img src={posterIMG} alt={data.title} />
            </Fade>
          </div>
          <div className="movie-card__content">
            <Fade bottom duration={1000} distance="30px">
              <h1>{data.title ? data.title : data.original_title}</h1>
              <p className="movie-card__tagline">{data.tagline}</p>
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
                  Vote Average: <span className="meta-data"><img src={imdbLogo} alt="imdb" />{data.vote} / 10</span>
                </div>
                <div className="movie-card__col">
                  Box Office: <span className="meta-data">{totalRevenue}</span>
                </div>
              </div>
            </Fade>

          </div>
        </div>
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
