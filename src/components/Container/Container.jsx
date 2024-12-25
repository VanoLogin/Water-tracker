import css from "./Container.module.css";

export const Container = ({ children, className }) => {
  return (
    <div className={`${css.container} ${className ?? ""}`}>{children}</div>
  );
  // Add your code here to create a container component with the specified styles and class names.
};
