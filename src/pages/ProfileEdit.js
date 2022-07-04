/* eslint-disable jsx-a11y/label-has-associated-control */
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
      <div className="page">
        <form className="edit">
          <div id="float-label">
            <input
              id="nome"
              className="login-name-input"
              type="text"
              value={ name }
              data-testid="edit-input-name"
              onChange={ ({ target }) => { this.setState({ name: target.value }); } }
            />
            <label htmlFor="nome">Nome</label>
          </div>
          <div id="float-label">
            <input
              id="email"
              className="login-name-input"
              type="email"
              value={ email }
              data-testid="edit-input-email"
              onChange={ ({ target }) => { this.setState({ email: target.value }); } }
            />
            <label htmlFor="email">E-mail</label>
          </div>
          <div id="float-label">
            <input
              className="login-name-input"
              id="descricao"
              type="text"
              value={ description }
              data-testid="edit-input-description"
              onChange={ ({ target }) => {
                this.setState({ description: target.value });
              } }
            />
            <label htmlFor="descricao">Descrição</label>
          </div>
          <div id="float-label">
            <input
              className="login-name-input"
              id="imagem"
              type="text"
              value={ image }
              data-testid="edit-input-image"
              onChange={ ({ target }) => { this.setState({ image: target.value }); } }
            />
            <label htmlFor="imagem">Imagem</label>
          </div>
          <button
            disabled={ name === '' || description === '' || image === '' }
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
      <div data-testid="page-profile-edit" className="pages">
        <Header />
        {loading ? <Loading /> : edit}
        {userCreated && <Redirect to="/profile" />}
      </div>
    );
  }
}

export default ProfileEdit;
