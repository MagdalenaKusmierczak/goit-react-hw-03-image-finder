import React, { Component } from 'react';
import axios from 'axios';

export class App extends Component {
  state = {
    input: '',
    search: '',
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
  handleSubmit = evt => {
    evt.preventDefault();
    const { search } = this.state;
    const trimInput = search.trim();
    this.setState({
      input: trimInput,
      images: [],
      currentPage: 1,
    });
    evt.target.reset();
  };

  handleInput = evt => {
    this.setState({ search: evt.target.value });
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
        isLoading: false,
        error: '',
        totalPages: Math.ceil(data.totalHits / 12),
      }));
    } catch (error) {
      this.setState({ error: 'Something went wrong!' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.input !== this.state.input ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.addImages();
    }
  }
  // Searchbar
  render() {
    const { images, search} = this.state;
    return (
      <div className="App">
        <header className="searchbar">
          <form className="form" onSubmit={this.handleSubmit}>
            <button type="submit" className="button">
              <span className="button-label">Search</span>
            </button>

            <input
              className="input"
              name="input"
              id="search"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={this.handleInput}
              value={search}
            />
          </form>
        </header>
        <ul className="gallery">
          {images.map(image => (
            <li className="gallery-item" key={image.id}>
              <img src={image.webformatURL} alt={image.tags} />
            </li>
          ))}
        </ul>
        <button className="button" onClick={this.loadMore}>
          Load more
        </button>
        <div className="overlay">
          <div className="modal">
            <img src="" alt="" />
          </div>
        </div>
      </div>
    );
  }
}
