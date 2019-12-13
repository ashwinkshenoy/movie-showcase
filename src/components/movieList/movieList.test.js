import React from 'react';
import { mount } from 'enzyme';
import MovieList from './movieList';

const mockData = [{
  'popularity': 82.512,
  'vote_count': 16005,
  'video': false,
  'poster_path': "/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
  'id': 299536,
  'adult': false,
  'backdrop_path': "/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg",
  'original_language': "en",
  'original_title': "Avengers: Infinity War",
  'genre_ids': [28, 12, 878],
  'title': "Avengers: Infinity War",
  'vote_average': 8.3,
  'overview': "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.",
  'release_date': "2018-04-25"
}];

const baseImgUrl = 'https://image.tmdb.org/t/p/w500';

let x = 0;
function onClickFunction(e) {return x++}

it('Check basic structure', () => {
  const wrapper = mount(<MovieList data={mockData}/>);  
  expect(wrapper.find('ul').exists()).toEqual(true);
  expect(wrapper.find('li').exists()).toEqual(true);
  expect(wrapper.find('.movie-list__wrapper').exists()).toEqual(true);
});

it('Check content', () => {
  const wrapper = mount(<MovieList data={mockData} fetchMovieID={onClickFunction.bind(this)} />);  
  expect(wrapper.find('.movie-list__content').exists()).toEqual(true);
  expect(wrapper.find('img').exists()).toEqual(true);
  expect(wrapper.find('img').prop('src')).toEqual(baseImgUrl+mockData[0].poster_path);
  expect(wrapper.find('h4').exists()).toEqual(true);
  expect(wrapper.find('h4').text()).toEqual(mockData[0].title);
  expect(wrapper.find('.movie-list__rating').exists()).toEqual(true);
  expect(wrapper.find('.movie-list__rating').text()).toEqual(mockData[0].vote_average+'/10');
  expect(wrapper.find('.movie-list__release span').text()).toEqual(mockData[0].release_date);
  wrapper.find('li').simulate('click');
  expect(onClickFunction()).toBe(1);
});
