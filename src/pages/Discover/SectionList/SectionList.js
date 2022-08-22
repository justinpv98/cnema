import React, { Fragment, useEffect } from "react";
import styles from "./SectionList.module.scss";
 
import { useActiveElement } from "../../../hooks";
 
import Section from "../Section/Section";
 
function SectionList({ moviesData }) {
 
 const { activeElement } = useActiveElement();
 
 useEffect(() => {
   
 }, [activeElement]);
 
 function renderMoviesList() {
   if (moviesData && moviesData.pages) {
     const { pages: movies } = moviesData;
 
     return movies.map((page, index) => (
       <Fragment key={index}>
         {page.results.map((movie, index) => index < 4 ? (
           <Section key={index} movie={movie} activeElement={activeElement}/>
         ): null)}
       </Fragment>
     ));
   } else {
     return null;
   }
 }
 
 return <ul className={styles.container}>{renderMoviesList()}</ul>;
}
 
export default SectionList;