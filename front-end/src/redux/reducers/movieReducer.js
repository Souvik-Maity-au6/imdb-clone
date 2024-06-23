const initialState = {
  movies: [],
  loading: true,
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_MOVIES":
      return {
        ...state,
        movies: action.payload,
        loading: false,
      };
    case "ADD_MOVIE":
      return {
        ...state,
        movies: [action.payload, ...state.movies],
        loading: false,
      };
    case "UPDATE_MOVIE":
      return {
        ...state,
        movies: state.movies.map((movie) =>
          movie._id === action.payload._id ? action.payload : movie
        ),
        loading: false,
      };
    case "DELETE_MOVIE":
      return {
        ...state,
        movies: state.movies.filter((movie) => movie._id !== action.payload),
        loading: false,
      };
    default:
      return state;
  }
};

export default movieReducer;
