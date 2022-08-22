import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './Discover.module.scss'
 
import { useDocumentTitle, useMoviesQuery } from '../../hooks';
 
import SectionList from './SectionList/SectionList';
import Loader from '../../components/Loader/Loader';
 
import { toTitleCase } from '../../utils/stringUtils';
 
function Discover() {
   const navigate = useNavigate()
   useDocumentTitle(toTitleCase('discover'));
 
   const { isSuccess, isLoading, isError, data } = useMoviesQuery('now_playing');
 
   if (isLoading) {
       return <Loader />;
     } else if (isSuccess) {
  
       return (
         <div className={styles.contentWrapper}>
           <SectionList moviesData={data} />
         </div>
       );
     } else if(isError){
       navigate('/404')
     }
}
 
export default Discover