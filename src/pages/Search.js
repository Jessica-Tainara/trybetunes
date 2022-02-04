import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artista: '',
    };
  }

  render() {
    const { artista } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Buscar</h1>
        <form>
          <input
            data-testid="search-artist-input"
            onChange={ ({ target }) => { this.setState({ artista: target.value }); } }
          />
          <button
            type="submit"
            disabled={ artista.length <= 1 }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
