import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      usuario: {
        description: '',
        email: '',
        image: '',
        name: '',
      },
    };
  }

  async componentDidMount() {
    const usuario = await getUser();
    this.setState({ usuario, loading: false });
  }

  render() {
    const { loading, usuario } = this.state;
    const prof = (
      <div className="page profile">
        <span className="labels-perfil">Nome</span>
        <span className="labels-perfil">E-mail</span>
        <span className="labels-perfil">Descrição</span>
        <p className="infos-user">{ usuario.name }</p>
        <p className="infos-user">{ usuario.email }</p>
        <p className="infos-user description">{ usuario.description }</p>
        <img
          data-testid="profile-image"
          alt="user"
          style={ { borderRadius: '100px',
            width: '200px',
            height: '200px',
            position: 'absolute',
            left: '200px',
            top: '170px' } }
          src={ usuario.image || 'https://centerforleg.dk/wp-content/uploads/2021/06/no-profile-picture-icon-13.jpg' }
        />
        <Link
          style={ { borderRadius: '100px',
            width: '200px',
            height: '200px',
            position: 'absolute',
            left: '250px',
            top: '400px' } }
          to="/profile/edit"
        >
          Editar perfil

        </Link>
      </div>
    );
    return (
      <div data-testid="page-profile" className="pages">
        <Header />
        {loading ? <Loading /> : prof}
      </div>
    );
  }
}

export default Profile;
