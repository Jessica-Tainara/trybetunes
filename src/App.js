import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import Content from './components/Content';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <p>TrybeTunes</p>
          <nav>
            <Link to="/">Login</Link>
            <Link to="/search">Buscar</Link>
            <Link to="/album/:id">Album</Link>
            <Link to="/favorites">Favoritos</Link>
            <Link to="/profile">Perfil</Link>
            <Link to="/profile/edit">Editar Perfil</Link>
          </nav>
          <Content />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
