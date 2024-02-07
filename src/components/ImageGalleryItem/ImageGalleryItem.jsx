import PropTypes from 'prop-types';

const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <>
      <li className="ImageGalleryItem " id={image.id} onClick={onClick}>
        <img
          className="ImageGalleryItem-image"
          src={image.webformatURL}
          alt={image.tags}
          name={image.largeImageURL}
        />
      </li>
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
