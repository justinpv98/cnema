import React, { Fragment, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useMovieQuery, useWatchlist } from "../../hooks/";

import styles from "./Movie.module.scss";

import { formatYearOnly, convertMinToHourMin } from "../../utils/dateTimeUtils";
import { formatStringToPath, formatRating } from "../../utils/stringUtils";

import ModalVideo from "react-modal-video";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import CastList from "./CastList/CastList";
import Button from "../../components/Button/Button";

function Movie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const data = useMovieQuery(id);
  const { isSuccess, isLoading, isError, data: movie } = data;

  function renderGenre(genres) {
    return genres.map(
      (genre, index) =>
        index <= 1 && (
          <Link
            key={genre.id}
            to={`/genre/${formatStringToPath(genre.name)}`}
            className={styles.genre}
          >
            {genre.name}
          </Link>
        )
    );
  }

  function renderTrailer(videos, isModalOpen, setIsModalOpen) {
    if (videos.length === 0) {
      return;
    }

    try {
      const { key } = videos.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      return (
        <Fragment>
          <Button
            variant="secondaryOutline"
            icon="play"
            onClick={() => setIsModalOpen(true)}
          >
            Play Trailer
          </Button>
          <ModalVideo
            channel="youtube"
            autoplay
            isOpen={isModalOpen}
            videoId={key}
            onClose={() => setIsModalOpen(false)}
          />
        </Fragment>
      );
    } catch (error) {
      return;
    }
  }

  function handleWatchlist() {
    return watchlist.find((watchlistMovie) => watchlistMovie.id === movie.id)
      ? removeFromWatchlist(movie.id)
      : addToWatchlist(movie);
  }

  if (isLoading) {
    return <Loader />;
  } else if (isSuccess) {
    const {
      backdrop_path,
      credits,
      genres,
      overview,
      recommendations,
      release_date,
      runtime,
      tagline,
      title,
      videos,
      vote_average,
    } = movie;

    const isInWatchlist = watchlist.find( //repeated code with line 75
      (watchlistMovie) => watchlistMovie.id === movie.id
    );

    const releases = movie.release_dates.results.find(
      (item) => item.iso_3166_1 === "US"
    );
    const releaseWithCertification = releases?.release_dates.find(
      (item) => item.certification !== ""
    );
    const certification = releaseWithCertification?.certification;

    return (
      <Fragment>
        <div className={styles.contentWrapper}>
          <img
            className={styles.backdrop}
            src={"https://image.tmdb.org/t/p/w1280" + backdrop_path}
            alt=""
          />
          <div className={styles.contentContainer}>
            <div>
              <h1 className={styles.title}>{title}</h1>
              <span className={styles.releaseDate}>
                ({formatYearOnly(release_date)})
              </span>
            </div>
            <div className={styles.details}>
              <p>
                <span className={styles.score}>{formatRating(vote_average)}</span>/10
              </p>
              <div className={styles.subDetails}>
                <p>{renderGenre(genres)}</p>
                <span className={styles.bullet}>•</span>
                {certification && (
                  <Fragment>
                    <p>{certification}</p>
                    <span className={styles.bullet}>•</span>
                  </Fragment>
                )}

                <p>{convertMinToHourMin(runtime)}</p>
              </div>
            </div>
            <h2 className={styles.tagline}>{tagline}</h2>
            <p className={styles.overview}>{overview}</p>
            <div className={styles.buttons}>
              <Button
                variant="primary"
                icon={isInWatchlist ? "x" : "plus"}
                onClick={() => handleWatchlist()}
              >
                {isInWatchlist ? "Remove From Watchlist" : "Add To Watchlist"}
              </Button>
              {renderTrailer(videos.results, isModalOpen, setIsModalOpen)}
            </div>
            <CastList credits={credits} />
          </div>
        </div>
        {recommendations.results.length > 0 && (
          <div className={styles.recommendationContainer}>
            <h2 className={styles.header}>Recommendations</h2>
            <MovieList moviesData={recommendations} />
          </div>
        )}
      </Fragment>
    );
  } else if (isError) {
    navigate("/404");
  }
}

export default Movie;
