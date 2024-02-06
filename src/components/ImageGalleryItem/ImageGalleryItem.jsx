import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';

class ImageGalleryItem extends Component {
  state = { modal: false };
  toggleModal = () => {
    this.setState(({ modal }) => ({
      modal: !modal,
    }));
  };
  render() {
    const { modal } = this.state;
    const { image } = this.props;
    return (
      <>
        <li className="ImageGalleryItem ">
          <img
            className="ImageGalleryItem-image"
            src={image.webformatURL}
            alt={image.tags}
            onClick={this.toggleModal}
          />
          {modal && (
            <Modal
              largeImageURL={image.largeImageURL}
              tags={image.tags}
              onClose={this.toggleModal}
            />
          )}
        </li>
      </>
    );
  }
}
ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageGalleryItem;
