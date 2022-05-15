import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Search from './Search';

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
    await createUser({ name });
    this.setState({
      userCreated: 'true',
    });
  }

  render() {
    const { userCreated, name } = this.state;
    const form = (
      <div className="page-login">
        <form>
          <input
            name="name"
            onChange={ ({ target }) => { this.setState({ name: target.value }); } }
            type="text"
            data-testid="login-name-input"
          />
          <Link to="/search">
            <button
              type="submit"
              onClick={ this.SaveUser }
              disabled={ name.length <= 2 }
              data-testid="login-submit-button"
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
    return (
      <div
        data-testid="page-login"
      >
        <Search loadingLogin={ false } />
        {form}
        {userCreated && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
