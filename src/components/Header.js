import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import disco from '../disco.png';
import procurar from '../procurar.svg';
import pasta from '../pasta.png';
import perfil from '../do-utilizador.svg';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: true,
    };
  }

  async componentDidMount() {
    await getUser()
      .then((data) => {
        this.setState({ name: data.name, loading: false });
      });
  }

  render() {
    const { loading, name } = this.state;
    const header = (
      <header id="header" data-testid="header-component">
        <div id="title" className="inline">
          <img
            className="icon"
            alt="icon"
            src={ disco }
            style={ { width: '50px' } }
          />
          <p className="title">TrybeTunes</p>
          <h2 data-testid="header-user-name">{ loading ? <Loading /> : name }</h2>
        </div>
        <nav id="nav">
          <Link data-testid="link-to-search" to="/search">
            <div className="inline">
              <img
                className="icon"
                alt="icon"
                src={ procurar }
                style={ { width: '25px', marginRight: '10px' } }
              />
              <p>Buscar</p>
            </div>
          </Link>
          <Link data-testid="link-to-favorites" to="/favorites">
            <div className="inline">
              <img
                className="icon"
                alt="icon"
                src={ pasta }
                style={ { width: '30px', marginRight: '5px' } }
              />
              <p>Favoritas</p>
            </div>

          </Link>
          <Link data-testid="link-to-profile" to="/profile">
            <div className="inline">
              <img
                className="icon"
                alt="icon"
                src={ perfil }
                style={ { width: '25px', marginRight: '10px' } }
              />
              <p>Perfil</p>
            </div>
          </Link>
        </nav>
      </header>
    );
    return header;
  }
}

export default Header;
