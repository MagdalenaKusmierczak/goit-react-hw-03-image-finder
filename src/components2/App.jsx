import React, { Component } from 'react';
import FetchApi from './Fetch/Fetch';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    error: null,
    isLoading: false,
    searchInput: '',
    totalOutput: null,
    selectImage: null,
    modal: false,
    lastPage: false,
  };

  getData = async () => {
    const { searchInput, currentPage, totalOutput } = this.state;
    this.setState({
      isLoading: true,
    });
    const data = await FetchApi(searchInput, currentPage);
    this.setState({ totalOutput: data.totalHits });
    if (totalOutput === 0) {
      alert(
        'No results were found for your search, please try something else!'
      );
    }
    try {
      const imagesData = data.hits.map(
        ({ id, tags, webformatURL, largeImageURL }) => ({
          id,
          tags,
          webformatURL,
          largeImageURL,
        })
      );
      this.setState(({ prevState }) => ({
        images: [...prevState.images, ...imagesData],
        currentPage: prevState.currentPage + 1,
        lastPage: prevState.images.length + imagesData.length >= totalOutput,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleCurrentPageUpdate = () => {
    this.setState(state => {
      return {
        currentPage: state.currentPage + 1,
      };
    });
  };
  hadleSubmit = searchInput => {
    if (this.state.searchInput === searchInput) {
      return;
    }
    this.setState({
      images: [],
      currentPage: 1,
      error: null,
      isLoading: false,
      searchInput: searchInput,
      totalOutput: null,
      selectImage: null,
      modal: false,
      lastPage: false,
    });
  };
  handleClick = () => {
    this.handleCurrentPageUpdate();
  };
  selectImage = image => {
    this.setState({
      selectedImage: image,
      modal: true,
    });
    document.body.style.overflow = 'hidden';
  };
  closeModal = () => {
    this.setState({
      selectedImage: null,
      modal: false,
    });
    document.body.style.overflow = 'auto';
  };

  async componentDidUpdate() {
    await this.getData;
  }

  shouldComponentUpdate(nextProps, nextState) {
    const oldState = this.state;

    if (
      nextState.images[0]?.id === oldState.images[0]?.id &&
      nextState.currentPage === oldState.currentPage
    ) {
      return false;
    }

    return true;
  }
  render() {
    const { images, isLoading, error, modal, selectedImage, lastPage } =
      this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.hadleSubmit} />
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <ImageGallery images={images} largeImage={this.selectImage} />
        {!isLoading && images.length > 0 && !lastPage && (
          <Button onClick={this.handleClick} />
        )}
        {modal && (
          <Modal image={selectedImage} onClose={this.handleModalClose} />
        )}
      </div>
    );
  }
}
