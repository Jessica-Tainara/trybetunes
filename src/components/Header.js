import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import disco from '../disco.png';
import procurar from '../procurar.svg';
import perfil from '../do-utilizador.svg';
import blackHeartIcon from '../blackHeartIcon.svg';

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
    const { name, loading } = this.state;
    const header = (
      <header id="header" data-testid="header-component">
        <div id="logo" className="inline">
          <img
            className="icon"
            alt="icon"
            src={ disco }
            style={ { width: '50px' } }
          />
          <p className="title">TrybeTunes</p>

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
          <div className="inline">
            <div
              style={ {
                borderRadius: '3px',
                background:
                  'linear-gradient(135deg,#450af5,#c4efd9)',
                width: '25px',
                height: '25px',
                padding: 'auto',
                marginRight: '15px' } }
            >
              <img
                className="icon"
                alt="icon"
                src={ blackHeartIcon }
                style={ { width: '15px', margin: 'auto', marginTop: '5px' } }
              />
            </div>
            <Link data-testid="link-to-favorites" to="/favorites">
              <p>Favoritas</p>
            </Link>
          </div>

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
          <h2
            data-testid="header-user-name"
            style={ {
              position: 'fixed',
              marginLeft: '30px',
              marginTop: '800px',
            } }
          >
            {loading ? <Loading /> : name }
          </h2>
        </nav>
      </header>
    );
    return header;
  }
}

export default Header;
