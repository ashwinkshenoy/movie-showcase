const movieReducer = (state = {}, action) => {
  switch(action.type) {
    case 'ADDMOVIE':
      return action.payload;
    case 'RESETMOVIE':
      return {};
    default:
      return state;
  }
}

export default movieReducer;
