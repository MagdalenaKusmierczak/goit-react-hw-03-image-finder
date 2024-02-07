import React, { Component } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';

export class App extends Component {
  state = {
    input: '',
    images: [],
    currentPage: 1,
    error: null,
    isLoading: false,
    totalPages: 0,
  };
  //API call
  fetchImages = async (input, currentPage) => {
    const API_KEY = '35262306-2ee6f92f6616bfcf6c7291f6d';
    axios.defaults.baseURL = 'https://pixabay.com/api/';
    const perPage = 12;
    const response = await axios.get(
      `?key=${API_KEY}&q=${input}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=${perPage}`
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
      input: input,
      images: [],
      currentPage: 1,
    });
  };

  //Generates gallery
  addImages = async () => {
    const { input, currentPage } = this.state;
    try {
      this.setState({ isLoading: true });
      const data = await this.fetchImages(input, currentPage);

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
      console.log('addImages!');
    }
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.input !== this.state.input ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.addImages();
      console.log('images added');
    }
  }
  render() {
    const { images, isLoading, currentPage, totalPages } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        {images.length > 0 && <ImageGallery images={images} />}
        {isLoading && <Loader />}
        {images.length > 0 && totalPages !== currentPage && (
          <Button onClick={this.loadMore} />
        )}
      </div>
    );
  }
}
