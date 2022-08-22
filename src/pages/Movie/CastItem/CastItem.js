import React from "react";
import styles from "./CastItem.module.scss";

function CastItem({ castMember }) {
  const { name, character, profile_path } = castMember;

  return (
    <div className={styles.container} tabIndex={0}>
      {profile_path ? (
        <img src={`https://image.tmdb.org/t/p/w185${profile_path}`} alt="" />
      ) : (
        <div />
      )}
      <div className={styles.tooltip}>
        <span>{name}</span>
        <span>{character}</span>
      </div>
    </div>
  );
}

export default CastItem;