import React from "react";
import { Link } from "react-router-dom";
import styles from "./Section.module.scss";
 
import cx from 'classnames'
 
function Section({ movie, activeElement }) {
 const { title, backdrop_path, overview} = movie;

  function isActive(el){
    // returns if element id is equal to the active element id
   return String(movie.id) === activeElement?.id ? cx(el, styles.active) : el
 }
 
 return (
   <li className={isActive(styles.container)} tabIndex={0} id={movie.id}>
     <div className={styles.backdropContainer}>
       <img
         src={`https://image.tmdb.org/t/p/w1280${backdrop_path}`}
         alt=""
         className={styles.image}
       />
     </div>
     <p aria-hidden="true" className={styles.sideTitle}>{title}</p>
     <div className={isActive(styles.detailsContainer)}>
       <h2 className={styles.title}>{title}</h2>
       <p className={styles.overview}>{overview}</p>
       <Link className={styles.linkButton} id={movie.id} to={`/movie/${movie.id}`}>Read More</Link>
     </div>
   </li>
 );
}
 
export default Section;