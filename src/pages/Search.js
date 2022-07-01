import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import disco from '../disco.png';
import procurar from '../procurar.svg';

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
      <form className="search">
        <input
          data-testid="search-artist-input"
          onChange={ ({ target }) => { this.setState({ artista: target.value }); } }
          value={ artista }
          placeholder="Artistas"
        />
        <img
          alt="icon"
          src={ procurar }
          style={ {
            position: 'absolute',
            width: '25px',
            marginRight: '250px',
            marginTop: '8px' } }
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
          {form}
          {loading ? <Loading /> : form}
          {hasAlbum ? <p className="feedback-search">{found}</p> : <p>{nFound}</p>}
          <div
            id="cards"
          >
            { !hasAlbum ? (
              <div>
                <img
                  className="icon"
                  alt="icon"
                  src={ disco }
                  style={ {
                    width: '300px',
                    marginTop: '30px',
                    position: 'fixed',
                    marginLeft: '-150px' } }
                />
              </div>
            )
              : albuns.map(({ collectionId,
                collectionName,
                artworkUrl100,
                artistName }) => {
                const lengthMax = 35;
                const urlImage = String(artworkUrl100).split('/');
                urlImage.splice(urlImage.length - 1, 1, '200x200bb.webp');

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
                        src={ urlImage.join('/') }
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
