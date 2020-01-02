
const initialState = {
  searchData: [],
  searchValue: null,
  loading: false,
  searchCast: {}
}

const searchReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SEARCHDATA':
      return {
        ...state, 
        searchData: action.payload
      };
    case 'SEARCHCAST':
      return {
        ...state,
        searchCast: action.payload
      }
    case 'SEARCHVALUE':
      return {
        ...state,
        searchValue: action.payload
      }
    case 'SEARCHLOADING':
      return {
        ...state,
        loading: action.payload
      }
    case 'RESETSEARCH':
      return { ...initialState };
    default:
      return state;
  }
}

export default searchReducer;
