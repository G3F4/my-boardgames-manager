import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import Header from './components/Header';
import GameEditorDialog from './components/GameEditorDialog';
import GamesList from './components/GamesList';
import GamesHttpClient from './GamesHttpClient';

const httpClient = new GamesHttpClient();

class App extends Component {
  state = {
    data: null,
    sortBy: '',
    title: '',
    editorOpen: false,
    editing: false,
    game: {},
  };

  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const sortBy = params.get('sortBy') || '';
    const title = params.get('title') || '';

    this.fetchList(sortBy, title);
  }

  fetchList(sortBy, title) {
    setTimeout(async () => {
      const data = await httpClient.read(sortBy, title);

      this.setState({ data, sortBy, title });
    }, 0);
  }

  handleSortByChange = async event => {
    const sortBy = event.target.value;
    const query = `?sortBy=${sortBy}&title=${this.state.title}`;

    window.history.pushState(null, null, query);
    this.fetchList(sortBy, this.state.title);
  };

  handleTitleFilterChange = async event => {
    const title = event.target.value;
    const query = `?sortBy=${this.state.sortBy}&title=${title}`;

    window.history.pushState(null, null, query);
    this.fetchList(this.state.sortBy, title);
  };

  handleOpenAddDialog = () => this.setState({ editorOpen: true });

  handleCloseAddDialog = () => this.setState({ editorOpen: false, game: {}, editing: false });

  handleGameChange = (key, value) => {
    this.setState({
      game: {
        ...this.state.game,
        [key]: value,
      }
    });
  };

  handleGameEdit = async editedGame => {
    this.setState({
      game: editedGame,
      editorOpen: true,
      editing: true,
    })
  };

  handleNewGameSave = async () => {
    const { game, sortBy, title } = this.state;

    try {
      await httpClient.create(game);

      this.handleCloseAddDialog();
      this.fetchList(sortBy, title);
    }

    catch (error) {
      console.error(error)
    }
  };

  handleEditedGameSave = async () => {
    const { game, sortBy, title } = this.state;

    try {
      await httpClient.update(game._id, game);

      this.handleCloseAddDialog();
      this.fetchList(sortBy, title);
    }

    catch (error) {
      console.error(error)
    }
  };

  handleGameDelete = async gameId => {
    try {
      await httpClient.delete(gameId);

      this.fetchList(this.state.sortBy, this.state.title);
    }

    catch (error) {
      console.error(error)
    }
  };

  render() {
    if (!this.state.data || !this.state.data.list) {
      return (
        <CircularProgress />
      );
    }

    const { editing, sortBy, title } = this.state;

    return (
      <div>
        <Header
          sortBy={sortBy}
          title={title}
          onSortByChange={this.handleSortByChange}
          onTitleFilterChange={this.handleTitleFilterChange}
          onOpenAddDialog={this.handleOpenAddDialog}
        />
        <GameEditorDialog
          open={this.state.editorOpen}
          game={this.state.game}
          onClose={this.handleCloseAddDialog}
          onSave={editing ? this.handleEditedGameSave : this.handleNewGameSave}
          onChange={this.handleGameChange}
        />
        <GamesList
          list={this.state.data.list}
          onDelete={this.handleGameDelete}
          onEdit={this.handleGameEdit}
        />
      </div>
    );
  }
}

export default App;
