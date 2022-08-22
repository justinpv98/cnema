import { useReducer, useEffect } from "react";
import WatchlistContext from "./watchlistContext";
import watchlistReducer from "./watchlistReducer";
import {
  ADD_TO_WATCHLIST,
  REMOVE_FROM_WATCHLIST,
} from "../constants/actionTypes";

const WatchlistProvider = (props) => {

  const initialState = {
    watchlist: JSON.parse(localStorage.getItem("watchlist")) || [],
  };

  const [state, dispatch] = useReducer(watchlistReducer, initialState);

  useEffect(() => {
    localStorage.setItem("watchlist", state.watchlist.length > 1 ? JSON.stringify([...state.watchlist]) : JSON.stringify(state.watchlist));
  }, [state]);


  function addToWatchlist(movie) {
    dispatch({type: ADD_TO_WATCHLIST, payload: movie });
  }

  function removeFromWatchlist(id) {
    dispatch({type: REMOVE_FROM_WATCHLIST,  payload: id });
  }

  return (
    <WatchlistContext.Provider
      value={{
        watchlist: state.watchlist,
        addToWatchlist,
        removeFromWatchlist,
      }}
    >
      {props.children}
    </WatchlistContext.Provider>
  );
};

export default WatchlistProvider;