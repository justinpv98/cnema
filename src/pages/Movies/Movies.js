import React from "react";
import styles from "./Movies.module.scss";

import { useParams, useNavigate} from "react-router-dom";
import { useDocumentTitle, useMoviesQuery } from "../../hooks";

import { toTitleCase } from "../../utils/stringUtils";

import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import Button from "../../components/Button/Button";
 
function Movies() {
  let { category } = useParams();
  const navigate = useNavigate();
  useDocumentTitle(toTitleCase(category));


  const { isSuccess, isLoading, isError, data, fetchNextPage } = useMoviesQuery(category);

  if (isLoading) {
    return <Loader />;
  } else if (isSuccess) {
    const { pages } = data;
    const { nextPage, totalPages } = pages[pages.length - 1];

    return (
      <div className={styles.contentWrapper}>
      <div className={styles.contentContainer}>
        <h2>{toTitleCase(category)}</h2>
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
  } else if(isError){
    navigate('/404')
  }
}

export default Movies;