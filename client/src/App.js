import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import { SERVER_HOST } from './constans';
import Header from './components/Header';
import NewGameDialog from './components/NewGameDialog';
import GamesList from './components/GamesList';

class App extends Component {
  state = {
    data: null,
    sortBy: '',
    title: '',
    addDialogOpen: false,
    newGame: {},
  };

  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const sortBy = params.get('sortBy') || '';
    const title = params.get('title') || '';

    this.fetchList(sortBy, title);
  }

  fetchList(sortBy, title) {
    return fetch(`${SERVER_HOST}?sortBy=${sortBy}&title=${title}`)
      .then(response => response.json())
      .then(data => this.setState({ data, sortBy, title }))
      .catch(error => console.error(error))
  }

  handleSortByChange = event => {
    const sortBy = event.target.value;
    const query = `?sortBy=${sortBy}&title=${this.state.title}`;

    window.history.pushState(null, null, query);
    this.fetchList(sortBy, this.state.title);
  };

  handleTitleFilterChange = event => {
    const title = event.target.value;
    const query = `?sortBy=${this.state.sortBy}&title=${title}`;

    window.history.pushState(null, null, query);
    this.fetchList(this.state.sortBy, title);
  };

  handleOpenAddDialog = () => this.setState({ addDialogOpen: true });

  handleCloseAddDialog = () => this.setState({ addDialogOpen: false });

  handleNewGameChange = (key, value) => {
    this.setState({
      newGame: {
        ...this.state.newGame,
        [key]: value,
      }
    });
  };

  handleNewGameAdd = () => {
    const { newGame, sortBy, title } = this.state;

    fetch(SERVER_HOST, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newGame, sortBy, title }),
    })
      .then(response => response.json())
      .then(data => this.setState({
        data,
        addDialogOpen: false,
      }))
      .catch(error => console.error(error))
  };

  render() {
    if (!this.state.data || !this.state.data.list) {
      return (
        <CircularProgress />
      );
    }

    const { sortBy, title } = this.state;

    return (
      <div>
        <Header
          sortBy={sortBy}
          title={title}
          onSortByChange={this.handleSortByChange}
          onTitleFilterChange={this.handleTitleFilterChange}
          onOpenAddDialog={this.handleOpenAddDialog}
        />
        <NewGameDialog
          open={this.state.addDialogOpen}
          newGame={this.state.newGame}
          onCloseDialog={this.handleCloseAddDialog}
          onNewGameAdd={this.handleNewGameAdd}
          onNewGameChange={this.handleNewGameChange}
        />
        <GamesList list={this.state.data.list} />
      </div>
    );
  }
}

export default App;
