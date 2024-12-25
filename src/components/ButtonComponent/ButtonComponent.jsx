import PropTypes from "prop-types";
import styles from "./ButtonComponent.module.css";

const ButtonComponent = ({
  text,
  color = "rgba(255, 255, 255, 1)",
  backgroundColor = "rgba(64, 123, 255, 1)",
  onClick,
  ariaLabel,
  width,
}) => {
  const buttonStyle = {
    backgroundColor,
    color,
    width,
  };

  return (
    <button
      className={styles.button}
      style={buttonStyle}
      onClick={() => onClick()}
      aria-label={ariaLabel || text}
    >
      {text}
    </button>
  );
};

ButtonComponent.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string,
  width: PropTypes.string,
};

export default ButtonComponent;
