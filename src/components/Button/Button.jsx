import PropTypes from 'prop-types';

const MoreButton = ({ onClick }) => {
  return (
    <div>
      <button className="Button" type="button" onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

MoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default MoreButton;
