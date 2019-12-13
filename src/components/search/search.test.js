import React from 'react';
import { shallow, mount } from 'enzyme';
import Search from './search';

it('renders without crashing', () => {
  shallow(<Search />);
});

it('Check structure', () => {
  const wrapper = mount(<Search />);  
  expect(wrapper.find('.movie-search').exists()).toEqual(true);
  expect(wrapper.find('form').exists()).toEqual(true);
  expect(wrapper.find('.movie-search__input').exists()).toEqual(true);
  expect(wrapper.find('.movie-search__input').prop('placeholder')).toEqual('Search Movie Title...');
  expect(wrapper.find('.movie-search__input').prop('autoComplete')).toEqual('off');
});
