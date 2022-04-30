import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artista: '',
      nFound: '',
      albuns: [],

    };
  }

  render() {
    const { artista, loading, hasAlbum, found, albuns, nFound } = this.state;
    const form = (
      <form>
        <input
          data-testid="search-artist-input"
          onChange={ ({ target }) => { this.setState({ artista: target.value }); } }
          value={ artista }
        />
        <button
          type="submit"
          disabled={ artista.length <= 1 }
          onClick={ async () => {
            this.setState({ loading: true });
            await searchAlbumsAPI(artista)
              .then((data) => {
                this.setState({
                  loading: false,
                  hasAlbum: data.length > 0,
                  found: `Resultado de álbuns de: ${artista}`,
                  artista: '',
                  albuns: data,
                  nFound: 'Nenhum álbum foi encontrado',
                });
              });
          } }
          data-testid="search-artist-button"
        >
          Pesquisar
        </button>
      </form>
    );

    return (
      <div data-testid="page-search" id="page-search">
        <Header />
        <div className="page">
          {loading ? <Loading /> : form}
          {hasAlbum ? <p>{found}</p> : <p>{nFound}</p>}
          <div id="cards">
            {albuns.map(({ collectionId, collectionName, artworkUrl100 }) => (

              <Link
                key={ collectionId }
                data-testid={ `link-to-album-${collectionId}` }
                to={ `album/${collectionId}` }
                className="card"
              >
                <img
                  alt={ collectionName }
                  src={ artworkUrl100 }
                  style={ { width: '150px' } }
                />
                <span>{collectionName}</span>
              </Link>

            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
