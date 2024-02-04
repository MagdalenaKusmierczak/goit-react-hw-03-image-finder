import PropTypes from 'prop-types';

const ImageGalleryItem = ({ tags, previewImg, largeImage }) => {
  return (
    <li className="ImageGalleryItem ">
      <img
        className="ImageGalleryItem-image"
        src={previewImg}
        alt={tags}
        onClick={largeImage}
      />
    </li>
  );
};
ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  previewImg: PropTypes.string.isRequired,
  largeImage: PropTypes.func,
};

export default ImageGalleryItem;
