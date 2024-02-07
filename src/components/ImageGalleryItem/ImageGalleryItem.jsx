import PropTypes from 'prop-types';

const ImageGalleryItem = ({ image }) => {
  return (
    <>
      <li className="ImageGalleryItem ">
        <img
          className="ImageGalleryItem-image"
          src={image.webformatURL}
          alt={image.tags}
          // onClick={this.toggleModal}
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
};

export default ImageGalleryItem;
