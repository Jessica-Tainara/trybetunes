import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.SaveUser = this.SaveUser.bind(this);

    this.state = {
      name: '',
    };
  }

  SaveUser= async () => {
    const { name } = this.state;
    this.setState({
      loading: 'true',
    });
    await createUser({ name });
    this.setState({
      userCreated: 'true',
      loading: 'false',
    });
  }

  render() {
    const { loading, userCreated, name } = this.state;
    const form = (
      <div>
        <h1>Login</h1>
        <form>
          <input
            name="name"
            onChange={ ({ target }) => { this.setState({ name: target.value }); } }
            type="text"
            data-testid="login-name-input"
          />
          <button
            type="submit"
            onClick={ this.SaveUser }
            disabled={ name.length <= 2 }
            data-testid="login-submit-button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
    return (
      <div data-testid="page-login">
        {loading ? <Loading /> : form}
        {userCreated && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
