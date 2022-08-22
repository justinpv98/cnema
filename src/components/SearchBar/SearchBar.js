import React, { Fragment, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchBar.module.scss";
import cx from "classnames";

import { useOnClickOutside } from "../../hooks/";

import Button from "../Button/Button";

function SearchBar() {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  let navigate = useNavigate();
  const ref = useRef();
  useOnClickOutside(ref, () => setIsOpen(false), ["BUTTON"]);

  function onSubmit(e) {
    e.preventDefault();

    if(value !== ""){
        navigate(`/search/${value}`);
    }
    
    setValue("");
    setIsOpen(false);
  }

  return (
    <Fragment>
      <Button
        variant="iconOnly"
        icon={isOpen ? "x" : "search"}
        className={styles.openSearchButton}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      ></Button>
      <div
      data-testid="wrapper"
        className={
          isOpen ? cx(styles.formWrapper, styles.open) : styles.formWrapper
        }
      >
        <form
          role="search"
          className={styles.form}
          onSubmit={onSubmit}
          ref={ref}
        >
          <Button
            variant="iconOnly"
            icon="search"
            className={styles.searchButton}
          />
          <label htmlFor="search" className={styles.visuallyHidden}>
            Search movies
          </label>
          <input
            id="search"
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search for movies..."
            value={value}
            className={styles.search}
          ></input>
        </form>
      </div>
      {isOpen && <div data-testid="overlay" className={styles.overlay} />}
    </Fragment>
  );
}

export default SearchBar;