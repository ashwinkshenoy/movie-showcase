import React from 'react';
import { mount } from 'enzyme';
import Card from './card';

const mockData = {
  'adult': false,
  'backdrop_path': "/hbn46fQaRmlpBuUrEiFqv0GDL6Y.jpg",
  'budget': 220000000,
  'genres': [{id: 878, name: "Science Fiction"}, {id: 28, name: "Action"}, {id: 12, name: "Adventure"}],
  'homepage': "http://marvel.com/avengers_movie/",
  'id': 24428,
  'imdb_id': "tt0848228",
  'original_language': "en",
  'original_title': "The Avengers",
  'overview': "When an unexpected enemy emerges and threatens global safety and security, Nick Fury, director of the ,international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster. Spanning the globe, a daring recruitment effort begins!",
  'popularity': 50.334,
  'poster_path': "/cezWGskPY5x7GaglTTRN4Fugfb8.jpg",
  'production_companies': [{
    'id': 420,
    'logo_path': "/hUzeosd33nzE5MCNsZxCGEKTXaQ.png",
    'name': "Marvel Studios",
    'origin_country': "US"
  }],
  'production_countries': [{iso_3166_1: "US", name: "United States of America"}],
  'release_date': "2012-04-25",
  'revenue': 1519557910,
  'runtime': 143,
  'spoken_languages': [{iso_639_1: "en", name: "English"}, {iso_639_1: "hi", name: "हिन्दी"}],
  'status': "Released",
  'tagline': "Some assembly required.",
  'title': "The Avengers",
  'video': false,
  'vote_average': 7.7,
  'vote_count': 21045
};

const baseImgUrl = 'https://image.tmdb.org/t/p/w500';


it('Check basic structure', () => {
  const wrapper = mount(<Card data={mockData} />);  
  expect(wrapper.find('.movie-card').exists()).toEqual(true);
  expect(wrapper.find('.movie-card__backdrop').exists()).toEqual(true);
  expect(wrapper.find('.movie-card__backdrop > img').exists()).toEqual(true);
});

it('Check card main div and img', () => {
  const wrapper = mount(<Card data={mockData} />);  
  expect(wrapper.find('.movie-card-main').exists()).toEqual(true);
  expect(wrapper.find('.movie-card__poster > img').exists()).toEqual(true);
  expect(wrapper.find('.movie-card__poster > img').prop('alt')).toEqual(mockData.title);
});

it('Check card contents', () => {
  const wrapper = mount(<Card data={mockData} />);  
  expect(wrapper.find('.movie-card__content').exists()).toEqual(true);
  expect(wrapper.find('h1').text()).toEqual(mockData.title);
  expect(wrapper.find('.movie-card__tagline').text()).toEqual(mockData.tagline);
  expect(wrapper.find('.movie-card__overview').text()).toEqual(mockData.overview);
  expect(wrapper.find('.movie-card__genre').exists()).toEqual(true);
  expect(wrapper.find('.movie-card__row').exists()).toEqual(true);
  expect(wrapper.find('.movie-card__col').exists()).toEqual(true);
  expect(wrapper.find('.meta-data').exists()).toEqual(true);
});
