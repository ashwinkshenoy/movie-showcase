const movieReducer = (state = {}, action) => {
  switch(action.type) {
    case 'ADDMOVIE':
      return action.payload;
    default:
      return state;
  }
}

export default movieReducer;
