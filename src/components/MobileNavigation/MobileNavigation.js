import { useState, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./MobileNavigation.module.scss";
import cx from "classnames";

import categoryRoutes from "../../constants/categoryRoutes";
import { formatStringToPath } from "../../utils/stringUtils";

import { useGenresQuery } from "../../hooks";

import { ReactComponent as Logo } from "../../assets/logo.svg";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: genres, isSuccess: fetchGenresSuccess } = useGenresQuery();

  function renderCategoryRoutes() {
    // Renders links from category routes

    return categoryRoutes.map((route) => (
      <NavLink
        key={route.name}
        className={({ isActive }) =>
          isActive ? cx(styles.navLink, styles.active) : styles.navLink
        }
        onClick={() => setIsOpen(!isOpen)}
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
        onClick={() => setIsOpen(!isOpen)}
        to={`/genre/${formatStringToPath(genre.name)}`}
      >
        <Icon icon="movie" />
        <span>{genre.name}</span>
      </NavLink>
    ));
  }

  return (
    <Fragment>
      <header className={styles.header}>
        <Button
          icon="hamburger"
          className={styles.hamburger}
          variant="iconOnly"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="open hamburger"
          aria-expanded="false"
        />
        <Link to="/discover" className={styles.logoWrapper}>
          <Logo />
        </Link>
        {isOpen && (
          <div
            data-testid="overlay"
            className={styles.overlay}
            onClick={() => setIsOpen(!isOpen)}
          />
        )}
      </header>
      <aside
        className={isOpen ? cx(styles.drawer, styles.open) : styles.drawer}
      >
        <div className={styles.drawerHeader}>
          <Button
            icon="x"
            className={styles.hamburger}
            variant="iconOnly"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="hamburger close"
          />
        </div>
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
    </Fragment>
  );
}

export default MobileNav;
