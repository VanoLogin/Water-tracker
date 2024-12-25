import icon from '../../assets/img/icons.svg'
import css from './IconComponent.module.css'
const IconComponent = ({ id, width, height, className = "", fillColor, stroke: strokeCollor }) => {
    return (
      <svg
        className={className}
        style={{ background: "transparent" }}
        width={width}
        height={height}
        aria-hidden="true"
      >
        <use
          className={css.stroke}
          href={`${icon}#icon-${id}`}
        />
      </svg>
    );
  };
  
  export default IconComponent;
  
