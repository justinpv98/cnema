import { Link, NavLink } from "react-router-dom";
import styles from "./Navigation.module.scss";
import cx from "classnames";

import categoryRoutes from "../../constants/categoryRoutes";
import { formatStringToPath } from "../../utils/stringUtils";

import { useGenresQuery } from "../../hooks";

import { ReactComponent as Logo } from "../../assets/logo.svg";
import Icon from "../Icon/Icon";

function Nav() {
  const { data: genres, isSuccess: fetchGenresSuccess } = useGenresQuery();
  
  function renderCategoryRoutes() {
      
    //Renders links from category routes

    return categoryRoutes.map((route) => (
      <NavLink
        key={route.name}
        className={({ isActive }) =>
          isActive ? cx(styles.navLink, styles.active) : styles.navLink
        }
        to={route.route}
      >
        <Icon icon={route.icon} />
        <span>{route.name}</span>
      </NavLink>
    ));
  }

  function renderGenresRoutes() {

    //Renders links of available genres

    return genres.map((genre) => (
      <NavLink
        key={genre.id}
        className={({ isActive }) =>
          isActive ? cx(styles.navLink, styles.active) : styles.navLink
        }
        to={`/genre/${formatStringToPath(genre.name)}`}
      >
        <Icon icon="movie" />
        <span>{genre.name}</span>
      </NavLink>
    ));
  }

  return (
    <aside className={styles.drawer}>
      <div className={styles.drawerHeader}>
        <Link to="/discover" className={styles.logoWrapper}>
          <Logo />
        </Link>
      </div>
      <a className={styles.skipLink} href="#main-content">Skip to Main Content</a>
      <div>
        <nav>{renderCategoryRoutes()}</nav>
        {fetchGenresSuccess && (
          <div className={styles.body}>
            <h3 className={styles.sectionTitle}>Genres</h3>
            {renderGenresRoutes()}
          </div>
        )}
      </div>
    </aside>
  );
}

export default Nav;