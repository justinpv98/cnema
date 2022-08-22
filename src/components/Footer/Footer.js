import React from "react";
import styles from "./Footer.module.scss";
import { ReactComponent as TMDBLogo } from "../../assets/tmdb.svg";

function Footer() {
  return (
    <footer className={styles.footer}>
        <a href="//www.themoviedb.org/" rel="noreferrer" target="_blank">
        <TMDBLogo className={styles.tmdbLogo} />
        </a>
        <p>
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </p>
    </footer>
  );
}

export default Footer;