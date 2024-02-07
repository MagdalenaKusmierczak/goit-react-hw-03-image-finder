import PropTypes from 'prop-types';

const Button = ({ onClick }) => {
  return (
    <div>
      <Button className="Button" type="button" onClick={onClick}>
        Load more
      </Button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default Button;
