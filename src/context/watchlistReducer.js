import {
    ADD_TO_WATCHLIST,
    REMOVE_FROM_WATCHLIST,
  } from "../constants/actionTypes";
  
  // eslint-disable-next-line
  export default function (state, action) {
    switch (action.type) {
        case ADD_TO_WATCHLIST:
            return {
                ...state,
                watchlist: state.watchlist.find(
                    (movie) => movie.id === action.payload.id
                )
                    ? [...state.watchlist]
                    : [...state.watchlist, action.payload],
            };
        case REMOVE_FROM_WATCHLIST:
            return {
                ...state,
                watchlist: state.watchlist.filter(
                    (movie) => movie.id !== action.payload
                ),
            };
        default:
            return {
                ...state
            };
    }
};