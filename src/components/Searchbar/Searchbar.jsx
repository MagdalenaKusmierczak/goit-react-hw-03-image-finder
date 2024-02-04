export class Searchbar extends Component {
  state = {
    filter: '',
  };
handleChange = evt => {
    this.setState({ filter: evt.currentTarget.value.toLowerCase() });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    if (this.state.filter.trim() === '') {
      alert('Please enter something');
      return;
    }
    this.props.onSubmit(this.state.filter);
    this.setState({ filter: '' });
  };
  return (
    <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit} >
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          name= 'filter'
          placeholder="Search images and photos"
          value={this.state.searchQuery}
          onChange={this.handleChange}
        />
      </form>
    </header>
  );
};


