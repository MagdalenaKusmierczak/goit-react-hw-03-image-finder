import PropTypes from 'prop-types';

const Modal = ({ largeImageURL, tags, onClose }) => {
  return (
    <div className="Overlay" onClick={onClose}>
      <div className="Modal">
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
