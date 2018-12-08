import React, { Component } from 'react';
import './App.css';

const SERVER_HOST = 'http://localhost:3000/';

class App extends Component {
  state = null;

  componentDidMount() {
    fetch(SERVER_HOST)
      .then(response => response.json())
      .then(data => this.setState(data))
      .catch(error => console.error(error))
  }

  render() {
    return (
      <div className="App">
        {JSON.stringify(this.state)}
      </div>
    );
  }
}

export default App;
