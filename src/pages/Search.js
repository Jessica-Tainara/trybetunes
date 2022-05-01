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
      <form className="search-bar">
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
      <div data-testid="page-search" className="pages">
        <Header />
        <div className="page">
          {loading ? <Loading /> : form}
          {hasAlbum ? <p>{found}</p> : <p>{nFound}</p>}
          <div
            id="cards"
          >
            { albuns.map(({ collectionId,
              collectionName,
              artworkUrl100,
              artistName }) => {
              const lengthMax = 35;
              return (
                <Link
                  key={ collectionId }
                  data-testid={ `link-to-album-${collectionId}` }
                  to={ `album/${collectionId}` }
                  className="card"
                >
                  <div>
                    <img
                      alt={ collectionName }
                      src={ artworkUrl100 }
                      style={ { width: '209.5px' } }
                    />
                  </div>
                  <div className="text-card">
                    <span>
                      {collectionName.length < lengthMax ? collectionName
                        : `${collectionName.substr(0, lengthMax)}...`}
                    </span>
                    <span className="artist-name">{artistName}</span>
                  </div>
                </Link>

              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
