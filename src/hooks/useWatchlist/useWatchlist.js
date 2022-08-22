import { useContext } from "react";
import WatchlistContext from "../../context/watchlistContext";

export default function useWatchlist() {
  // streamlines useContext process for watchlist

  const context = useContext(WatchlistContext);
  return context;
}