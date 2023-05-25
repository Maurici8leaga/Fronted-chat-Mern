import PropTypes from 'prop-types';
import '@molecules/input/Input.scss';

const Input = (props) => {
  const { id, name, type, value, className, labelText, placeholder, handleChange, style } = props;
  // este seran los props que este component solicite para si poder sastifacer

  return (
    <div className="form-row">
      {labelText && (
        <label htmlFor={name} className="form-label">
          {labelText}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`form-input ${className}`}
        style={style}
        autoComplete="false"
      />
    </div>
  );
};

// Design Pattern Observer: https://refactoring.guru/es/design-patterns/observer
Input.propTypes = {
  // Proptypes ya viene incorporado en. react
  // PropTypes usualmente lo recibe los hijos , son como las interfaces de typescript
  id: PropTypes.string,
  name: PropTypes.string,
  // si no se le coloca "isRequired" hace que sea opcional el prop
  type: PropTypes.string,
  value: PropTypes.any, // si un proptype pasa a ser de varios tipos como string o boolean , una solucion para evitar el warning es pasarlo a tipo any
  className: PropTypes.string,
  labelText: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  style: PropTypes.object
};

export default Input;
