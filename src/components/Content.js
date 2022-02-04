import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Search from '../pages/Search';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import Favorites from '../pages/Favorites';
import Album from '../pages/Album';
import NotFound from '../pages/NotFound';

export default class Content extends React.Component {
  render() {
    return (
      <main className="Content">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/search" component={ Search } />
          <Route exact path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/album/:id" component={ Album } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </main>
    );
  }
}
