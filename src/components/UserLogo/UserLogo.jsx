import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/user/selectors";
import { logOut } from "../../redux/auth/operations";
import UserLogoutModal from "../UserLogoutModal/UserLogoutModal";
import SettingModal from "../SettingModal/SettingModal";
import UserLogoModal from "../UserLogoModal/UserLogoModal";
import icon from "../../assets/img/icons.svg";
import css from "./UserLogo.module.css";
import { use } from "i18next";

const UserLogo = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserData);
  console.log(user);

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isUserLogoModalOpen, setIsUserLogoModalOpen] = useState(false);
  const [anchorPosition, setAnchorPosition] = useState(null);
  const buttonRef = useRef(null);

  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const handleConfirmLogout = () => {
    dispatch(logOut());
    setIsLogoutModalOpen(false);
  };

  const handleCloseSettingModal = () => {
    setIsSettingModalOpen(false);
  };

  const handleUserLogoClick = (e) => {
    if (e.target.closest("svg")) {
      const button = buttonRef.current;
      if (button) {
        const rect = button.getBoundingClientRect();
        setAnchorPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
        });
      }
      setIsUserLogoModalOpen(false);
    }
  };

  const handleCloseUserLogoModal = () => {
    setIsUserLogoModalOpen(false);
  };

  const getUserInitial = () => {
    if (user.name) {
      return user.name.charAt(0).toUpperCase();
    }
    if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "?";
  };

  const handleToggleModal = () => {
    setIsUserLogoModalOpen((prevState) => !prevState);
  };

  return (
    <div className={css.wrapper}>
      <div className={css.point}>
        <p className={css.user} onClick={handleCloseUserLogoModal}>
          {user.name ? user.name : "User"}
        </p>
        <button
          ref={buttonRef}
          className={css.userLogoButton}
          onClick={handleUserLogoClick}
        >
          {user.photo ? (
            <img
              src={user.photo}
              alt={`${user.name}'s avatar`}
              className={css.avatar}
            />
          ) : (
            <span className={css.userInitial}>
              {user.name ? user.name : getUserInitial()}
            </span>
          )}
        </button>
        <svg className={css.icon} onClick={handleToggleModal}>
          <use href={`${icon}#icon-arrow-down`} />
        </svg>
      </div>

      {isLogoutModalOpen && (
        <UserLogoutModal
          isOpen={isLogoutModalOpen}
          onClose={handleCloseLogoutModal}
          onLogout={handleConfirmLogout}
        />
      )}

      {isSettingModalOpen && (
        <SettingModal
          isOpen={isSettingModalOpen}
          onClose={handleCloseSettingModal}
        />
      )}

      {isUserLogoModalOpen && (
        <UserLogoModal
          isOpen={isUserLogoModalOpen}
          onClose={handleCloseUserLogoModal}
          anchorPosition={anchorPosition}
        />
      )}
    </div>
  );
};

export default UserLogo;
