import React from "react";
import styles from "./MovieCard.module.scss";
import { Link } from "react-router-dom";

import { formatYearOnly } from "../../utils/dateTimeUtils";

function MovieCard({ movie }) {
  const { title, release_date, poster_path, id } = movie;

  return (
    <li className={styles.movieCard}>
      <Link to={`/movie/${id}`} className={styles.underlay}>
        {poster_path !== null ? (
          <img
            src={`https://image.tmdb.org/t/p/w300${poster_path}`}
            alt=""
            className={styles.image}
          />
        ) : (
          <div role="presentation" className={styles.imagePlaceholder} />
        )}
        <div className={styles.contentWrapper}>
          <h3 className={styles.title}>
            
            {title}</h3>
          <p>{formatYearOnly(release_date)}</p>
        </div>
      </Link>
    </li>
  );
}

export default MovieCard;