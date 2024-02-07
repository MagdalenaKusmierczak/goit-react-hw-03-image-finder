import PropTypes from 'prop-types';

const MoreButton = ({ onClick }) => {
  return (
    <button className="Button" type="button" onClick={onClick}>
      Load more
    </button>
  );
};

MoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default MoreButton;
