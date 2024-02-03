import React, { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
// import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
//import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
// import Modal from './Modal/Modal';

const API_KEY = '35262306-2ee6f92f6616bfcf6c7291f6d';
const baseURL = 'https://pixabay.com/api/?key=';

export class App extends Component {
  state = {
    images: [],
    id: '',
    tags: '',
    webformatURL: '',
    largeImageURL: '',
    filter: '',
    activePage: 1,
    error: null,
    isLoading: false,
  };

  URL =
    baseURL +
    API_KEY +
    '&q=' +
    this.filter +
    `page=${this.activePage}&image_type=photo&orientation=horizontal&per_page=12`;
  render() {
    console.log(URL);
    return (
      <div className="App">
        <Searchbar onSubmit />
        <ImageGallery>
          <ImageGalleryItem />
        </ImageGallery>
        <Button onClick />
      </div>
    );
  }
  // componentDidMount() {
  // }
  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.contacts !== prevState.contacts) {
  //   }
  // }
}
//
