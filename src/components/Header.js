import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

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
        <div id="title">
          <p>TrybeTunes</p>
          <h2 data-testid="header-user-name">{ name }</h2>
        </div>
        <nav id="nav">
          <Link data-testid="link-to-search" to="/search">Buscar</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
          <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        </nav>
      </header>
    );
    return (
      <div>
        {loading ? <Loading /> : header}
      </div>
    );
  }
}

export default Header;
