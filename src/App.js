import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Content from './components/Content';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <p>TrybeTunes</p>
          <Content />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
