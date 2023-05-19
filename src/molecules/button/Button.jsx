import PropTypes from 'prop-types';

const Button = (props) => {
  const { label, className, handleClick } = props;
  // este seran los props que este component solicite para si poder sastifacer

  return (
    <>
      <button className={className} onClick={handleClick}>
        {label}
      </button>
    </>
  );
};

// Design Pattern Observer: https://refactoring.guru/es/design-patterns/observer
Button.propTypes = {
  // Proptypes ya viene incorporado en. react
  // PropTypes usualmente lo recibe los hijos , son como las interfaces de typescript
  label: PropTypes.string.isRequired,
  // si un elemento es "isRequired" si no se le pasa este, dara un error en el terminal
  className: PropTypes.string.isRequired,
  handleClick: PropTypes.func
  // si no se le coloca "isRequired" hace que sea opcional el prop
};

export default Button;
