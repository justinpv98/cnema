import React from "react";
import styles from './Loader.module.scss'
function Loader() {
  return (
      <div className={styles.container}>
    <div className={styles.ldsEllipsis}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    </div>
  );
}

export default Loader;
