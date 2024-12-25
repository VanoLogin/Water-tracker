import { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./style.module.scss";
import PropTypes from "prop-types";

export default function Modal({
  modalTitle,
  onClose,
  children,
  isOpen,
  setIsOpen,
}) {
  const handleCloseModal = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  useEffect(() => {
    // if (isOpen) {
    //   document.body.style.overflow = "hidden"; // Disable body scroll when modal is open
    // } else {
    //   document.body.style.overflow = "auto"; // Restore body scroll when modal is closed
    // }

    const handleKeyDown = ({ key }) => {
      if (key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]); // Trigger effect when isOpen changes

  if (!isOpen) return null; // Do not render the modal if it's not open

  return ReactDOM.createPortal(
    <div className={styles.modalWrapper} onClick={handleCloseModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalTop}>
          <h3>{modalTitle}</h3>
          <button onClick={handleCloseModal}>
            <svg className={styles.svg} width={20} height={20}>
              <use href="/src/assets/img/icons.svg#icon-cross"></use>
            </svg>
          </button>
        </div>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.propTypes = {
  modalTitle: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};
