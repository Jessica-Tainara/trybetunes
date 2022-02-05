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
      <div>
        <p>{ usuario.name }</p>
        <p>{ usuario.description }</p>
        <p>{ usuario.email }</p>
        <img data-testid="profile-image" alt="user" src={ usuario.image } />
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <Loading /> : prof}
      </div>
    );
  }
}

export default Profile;
