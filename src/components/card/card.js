import React, { Component } from 'react';
import './card.css'


class Card extends Component {
  render() {
    let data = this.props.data || {}

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
    } else {
      data.vote = data.vote + ' / 10'
    };

    if (totalRevenue === 'undefined' || totalRevenue === 0) {
      totalRevenue = noData
    } else {
      totalRevenue = data.revenue && '$' + data.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    if(data.poster== null){
      posterIMG = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSols5HZxlQWyS9JY5d3_L9imbk0LiziHiyDtMZLHt_UNzoYUXs2g';
    }

    if(data.backdrop== null){
      backdropImg = '';
    }


    return (
      <div className="movie-card">

        <div className="movie-card__backdrop">
          <img src={backdropImg} alt={`backdrop-${data.original_title}`} />
        </div>

        <div className="movie-card-main">
          <div className="movie-card__poster">
            <img src={posterIMG} alt={data.original_title} />
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
                Running Time: <span className="meta-data">{data.runtime} mins</span>
              </div>
              <div className="movie-card__col">
                Vote Average: <span className="meta-data">{data.vote}</span>
              </div>
              <div className="movie-card__col">
                Box Office: <span className="meta-data">{totalRevenue}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }

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

export default Card;
