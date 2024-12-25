import css from "./Logo.module.css";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useNavigate } from "react-router-dom";
import icon from '../../assets/img/icons.svg'

const Logo = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  const handleWaterTrackerClick = () => {
    if (isLoggedIn) {
      navigate("/homepage");
    } else {
      navigate("/welcome");
    }
  };

  return (
    <nav className={css.nav}>
      <button className={css.title} onClick={handleWaterTrackerClick}>
        <svg className={css.icon}>
          <use href={`${icon}#icon-logo`} />
        </svg>
      </button>
    </nav>
  );
};

export default Logo;
