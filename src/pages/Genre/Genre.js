import React from "react";
import styles from "./Genre.module.scss";

import { useDocumentTitle, useMoviesByGenreQuery } from "../../hooks";
import { useParams, useNavigate } from "react-router-dom";

import { toTitleCase } from "../../utils/stringUtils";

import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import Button from "../../components/Button/Button";

function Genre() {
  let { genre } = useParams();
  const navigate = useNavigate();

  genre = toTitleCase(genre);
  useDocumentTitle(genre);

  const { isSuccess, isLoading, isError, data, fetchNextPage } =
    useMoviesByGenreQuery(genre); 

  if (isLoading) {
    return <Loader />;
  } else if (isSuccess) {
    const { pages } = data;
    const { nextPage, totalPages } = pages[pages.length - 1];

    return (
    
      <div className={styles.contentWrapper}>
      <div className={styles.contentContainer}>
        <h2>{genre}</h2>
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
    navigate("/");
  }
}

export default Genre;