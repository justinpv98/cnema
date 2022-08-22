import React, { Fragment } from "react";
import styles from "./Watchlist.module.scss";

import { useWatchlist } from "../../hooks/";

import MovieList from "../../components/MovieList/MovieList";
import { Link } from "react-router-dom";

function Watchlist() {
  const { watchlist } = useWatchlist();

  const data = {
    results: watchlist,
  };

  function renderWatchlist() {
    if (watchlist.length) {
      return (
        <Fragment>
          <h2 className={styles.header}>Watchlist</h2>
          <MovieList moviesData={data} />
        </Fragment>
      );
    } else {
      return (
        <div className={styles.notFound}>
          <h2>
            Sorry, your wishlist is empty. Find movies to add to your wishlist.
          </h2>
          <Link className={styles.linkButton} to="/discover">
            Discover Movies
          </Link>
        </div>
      );
    }
  }
  return (
    <div className={styles.contentWrapper}>
      <div className={styles.contentContainer}>{renderWatchlist()}</div>
    </div>
  );
}

export default Watchlist;
