import React from "react";
import styles from "./Trending.module.scss";

import { useDocumentTitle, useMoviesByTrendingQuery } from "../../hooks";
import { useNavigate } from "react-router-dom";

import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import Button from "../../components/Button/Button";

function Trending() {
  // structurally similar to movies page, but api endpoint is different
  // enough that it requires two different components
  const navigate = useNavigate();

  useDocumentTitle("Trending");
  const { isSuccess, isLoading, isError, data, fetchNextPage } = useMoviesByTrendingQuery();

  if (isLoading) {
    return <Loader />;
  } else if (isSuccess) {
    const { pages } = data;
    const { nextPage, totalPages } = pages[pages.length - 1];

    return (
      <div className={styles.contentWrapper}>
      <div className={styles.contentContainer}>
        <h2>Trending</h2>
        <MovieList moviesData={data} />
        {nextPage < totalPages && (
          <Button
            variant="primary"
            className={styles.loadMoreButton}
            onClick={() => {
              fetchNextPage();
            }}
          >
            Load More
          </Button>
        )}
      </div>
      </div>
    );
  } else if (isError) {
    navigate("/404");
  }
}

export default Trending;
