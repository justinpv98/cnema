import React from "react";
import styles from "./Search.module.scss";

import { useParams, useNavigate } from "react-router-dom";
import { useDocumentTitle, useMoviesBySearchQuery } from "../../hooks";

import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import Button from "../../components/Button/Button";

function Search() {
  const { query } = useParams();
  const navigate = useNavigate();

  useDocumentTitle(`Search Results for '${query}'`);
  const { isSuccess, isLoading, isError, data, fetchNextPage } =
    useMoviesBySearchQuery(query);

  if (isLoading) {
    return <Loader />;
  } else if (isSuccess) {
    const { pages } = data;
    const { nextPage, totalPages } = pages[pages.length - 1];

    return (
      <div className={styles.contentWrapper}>
        <div className={styles.contentContainer}>
          <h2>Search</h2>
          <MovieList moviesData={data} />
          {nextPage < totalPages && (
            <Button
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

export default Search;
