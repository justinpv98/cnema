import React, { useState } from "react";
import styles from "./Button.module.scss";
import PropTypes from "prop-types";
import cx from "classnames";

import Icon from "../Icon/Icon";

function Button({ variant, className, icon, children, onClick, ...props }) {
  const [disabled, setDisabled] = useState(false);

  //if button has an onClick function and is clicked, then the button is disabled for 200ms
  function handleClick(e) {
    if (onClick) {
      e.preventDefault();
      onClick();
      setDisabled(true);
      setTimeout(() => {
        setDisabled(false);
      }, 200);
    } else {
      return null;
    }
  }

  return (
    <button
      className={cx(styles[variant], className)}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {icon && <Icon icon={icon} strokeWidth="2" />}
      {children && <span>{children}</span>}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  variant: "primary",
};

export default Button;
