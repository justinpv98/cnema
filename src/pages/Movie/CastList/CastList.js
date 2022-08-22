import React from "react";
import styles from "./CastList.module.scss";

import CastItem from "../CastItem/CastItem";

function CastList({ credits }) {
  const cast = credits.cast;

  const castMembers = cast.sort((a, b) => a.order - b.order).slice(0, 5);

  return (
    <div className={styles.container}>
      {castMembers.map((castMember) => (
        <CastItem key={castMember.id} castMember={castMember} />
      ))}
    </div>
  );
}

export default CastList;