import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      description: '',
      email: '',
      image: '',
      name: '',
      userCreated: false,
    };
  }

  async componentDidMount() {
    const usuario = await getUser();
    const { name, image, email, description } = usuario;
    this.setState({ name, image, email, description, loading: false });
  }

  render() {
    const { loading, name, image, email, description, userCreated } = this.state;
    const edit = (
      <div>
        <form>
          <input
            type="text"
            value={ name }
            data-testid="edit-input-name"
            onChange={ ({ target }) => { this.setState({ name: target.value }); } }
          />
          <input
            type="email"
            value={ email }
            data-testid="edit-input-email"
            onChange={ ({ target }) => { this.setState({ email: target.value }); } }
          />
          <input
            type="text"
            value={ description }
            data-testid="edit-input-description"
            onChange={ ({ target }) => { this.setState({ description: target.value }); } }
          />
          <input
            type="text"
            value={ image }
            data-testid="edit-input-image"
            onChange={ ({ target }) => { this.setState({ image: target.value }); } }
          />
          <button
            disabled={ name === '' && description === '' && image === '' }
            type="submit"
            data-testid="edit-button-save"
            onClick={ async () => {
              this.setState({ loading: true });
              await updateUser({ name, description, image, email });
              this.setState({ userCreated: true });
            } }
          >
            Salvar
          </button>

        </form>
      </div>
    );
    return (
      <div data-testid="page-profile-edit">
        <h1>Editar Perfil</h1>
        <Header />
        {loading ? <Loading /> : edit}
        {userCreated && <Redirect to="/profile" />}
      </div>
    );
  }
}

export default ProfileEdit;
