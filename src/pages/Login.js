/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import disco from '../disco.png';
import template from '../template.png';

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
        <img
          alt="icon"
          src={ template }
          style={ {
            width: '400px', marginLeft: '500px', position: 'fixed' } }
        />
        <img 
           className="icon"
          alt="icon"
          src={ disco }
          style={ {
            width: '200px', marginLeft: '150px' } }
        /> 
        <form>
          <div id="float-label-login">
            <input
              name="name"
              id="input-login"
              onChange={ ({ target }) => { this.setState({ name: target.value }); } }
              type="text"
              className="login-name-input"
            />
            <label
              htmlFor="input-login"
              id="violet"
            >
              Seu nome

            </label>
          </div>
          <Link to="/search">
            <button
              type="submit"
              onClick={ this.SaveUser }
              disabled={ name.length <= 2 }
              className="login-submit-button"
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
    return (
      <>
        {form}
        {userCreated && <Redirect to="/search" />}
      </>
    );
  }
}

export default Login;
