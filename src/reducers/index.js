import { combineReducers } from 'redux';
import movieReducer from './movieReducer';
import searchReducer from './searchReducer';

const allReducers = combineReducers({
  movie: movieReducer,
  search: searchReducer
})

export default allReducers;
