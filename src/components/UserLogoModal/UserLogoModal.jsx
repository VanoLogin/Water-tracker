import { useEffect, useRef, useState } from "react";
import css from "./UserLogoModal.module.css";
import SettingModal from "../SettingModal/SettingModal";
import UserLogoutModal from "../UserLogoutModal/UserLogoutModal";
import icon from '../../assets/img/icons.svg'

const UserLogoModal = ({ isOpen, onClose, anchorPosition }) => {
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const modalRef = useRef(null);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleOpenSettings = () => {
    setIsSettingModalOpen(true);
  };

  const handleOpenLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const handleCloseSettings = () => {
    setIsSettingModalOpen(false);
  };

  const handleCloseLogout = () => {
    setIsLogoutModalOpen(false);
  };

  useEffect(() => {
    if (isOpen && anchorPosition) {
      const modalElement = modalRef.current;
      modalElement.style.top = `${anchorPosition.top}px`;
      modalElement.style.left = `${anchorPosition.left}px`;
    }
  }, [isOpen, anchorPosition]);

  if (!isOpen) return null;

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal} ref={modalRef}>
        <div className={css.buttons}>
          <div className={css.buttonsSettings}>
            <svg className={css.buttonsSettingsImg}>
              <use href={`${icon}#icon-settings`} />
            </svg>
            <button className={css.settingsButton} onClick={handleOpenSettings}>
              Settings
            </button>
          </div>
          <div className={css.buttonsLogout}>
            <svg className={css.buttonsLogoutImg}>
              <use href={`${icon}#icon-logout`} />
            </svg>
            <button className={css.logoutButton} onClick={handleOpenLogout}>
              Logout
            </button>
          </div>
        </div>
        {isSettingModalOpen && (
          <SettingModal
            isOpen={isSettingModalOpen}
            onClose={handleCloseSettings}
          />
        )}
        {isLogoutModalOpen && (
          <UserLogoutModal
            isOpen={isLogoutModalOpen}
            onClose={handleCloseLogout}
            onLogout={() => {
              setIsLogoutModalOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default UserLogoModal;
