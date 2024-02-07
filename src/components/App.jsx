import React, { Component } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import MoreButton from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    inputValue: '',
    images: [],
    currentPage: 1,
    error: null,
    isLoading: false,
    totalPages: 0,
    isModalOpen: false,
    modalImage: '',
    modalTags: '',
  };
  //API call
  fetchImages = async (inputValue, currentPage) => {
    const API_KEY = '35262306-2ee6f92f6616bfcf6c7291f6d';
    axios.defaults.baseURL = 'https://pixabay.com/api/';
    const perPage = 12;
    const response = await axios.get(
      `?key=${API_KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=${perPage}`
    );
    return response.data;
  };

  imagesData = responseData =>
    responseData.map(({ id, tags, webformatURL, largeImageURL }) => {
      return { id, tags, webformatURL, largeImageURL };
    });

  //Load more button
  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };
  //Submit search
  handleSubmit = input => {
    this.setState({
      inputValue: input,
      images: [],
      currentPage: 1,
    });
  };

  //Generates gallery
  addImages = async () => {
    const { inputValue, currentPage } = this.state;
    try {
      this.setState({ isLoading: true });
      const data = await this.fetchImages(inputValue, currentPage);

      if (data.hits.length === 0) {
        return alert('Image not found');
      }
      const normalizedImages = this.imagesData(data.hits);

      this.setState(state => ({
        images: [...state.images, ...normalizedImages],
        totalPages: Math.ceil(data.totalHits / 12),
        isLoading: false,
        error: '',
      }));
    } catch (error) {
      this.setState({ error: 'Something went wrong!' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.inputValue !== this.state.inputValue ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.addImages();
    }
  }
  //Modal
  handleClose = evt => {
    this.setState({
      isModalOpen: false,
      modalImage: '',
      modalTags: '',
    });
  };
  onClose = evt => {
    if (evt.target === evt.currentTarget) {
      this.handleClose();
    }
  };
  handleClick = evt => {
    this.setState({
      isModalOpen: true,
      modalTags: evt.target.alt,
      modalImage: evt.target.name,
    });
  };
  async componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  async componentWillUnmount() {
    window.removeEventListener('keydown', this.onClose);
  }

  handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.handleClose();
    }
  };

  render() {
    const {
      images,
      isLoading,
      totalPages,
      currentPage,
      isModalOpen,
      modalImage,
      modalTags,
    } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        {images.length > 0 && (
          <ImageGallery imageClick={this.handleClick} images={images} />
        )}
        {isLoading && <Loader />}
        {images.length > 0 && totalPages !== currentPage && (
          <MoreButton onClick={this.loadMore} />
        )}
        {isModalOpen ? (
          <Modal
            largeImageURL={modalImage}
            tags={modalTags}
            onClose={this.onClose}
          />
        ) : null}
      </div>
    );
  }
}
