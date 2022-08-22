import React, { Fragment } from "react";
import styles from "./MovieList.module.scss";

import MovieCard from "../MovieCard/MovieCard";

function MovieList({ moviesData }) {
  function renderMoviesList() {
    if (moviesData && moviesData.pages) {
      const { pages: movies } = moviesData;

      return movies.map((page, index) => (
        <Fragment key={index}>
          {page.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Fragment>
      ));
    } else if (moviesData && moviesData.results) {
      return moviesData.results.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ));
    } else {
      return null;
    }
  }

  return (
    <ul className={styles.gridContainer}>
      {renderMoviesList()}
    </ul>
  );
}

export default MovieList;
