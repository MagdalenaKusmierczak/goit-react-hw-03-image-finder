import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  state = {
    inputValue: '',
    search: '',
  };
  handleInput = evt => {
    this.setState({ search: evt.target.value });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    const trimInput = evt.target.elements.inputValue.value.trim();
    this.props.onSubmit(trimInput);
    evt.target.reset();
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            name="inputValue"
            id="search"
            placeholder="Search images and photos"
            value={this.state.search}
            onChange={this.handleInput}
          />
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
export default Searchbar;
