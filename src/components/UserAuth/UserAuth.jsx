import { NavLink } from "react-router-dom";
import css from "./UserAuth.module.css";
import icon from '../../assets/img/icons.svg'

const UserAuth = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.linkWrapper}>
        <NavLink className={css.navLink} to="/signin">
          Sign in
          <svg className={css.icon}>
            <use href={`${icon}#icon-user`} />
          </svg>
        </NavLink>
      </div>
    </div>
  );
};

export default UserAuth;
