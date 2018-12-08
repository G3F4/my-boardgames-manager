import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

const SERVER_HOST = 'http://localhost:3000/';

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
    const sortBy = params.get('sortBy');
    const title = params.get('title');

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

  handleOpenAddDialog = () => {
    console.log(['handleOpenAddDialog'])
    this.setState({ addDialogOpen: true });
  };

  handleCloseAddDialog = () => {
    console.log(['handleCloseAddDialog'], this.state.newGame)
    this.setState({ addDialogOpen: false });
  };

  handleNewGameTitleChange = event => this.setState({
    newGame: {
      ...this.state.newGame,
      title: event.target.value,
    }
  });

  handleNewGameDescriptionChange = event => this.setState({
    newGame: {
      ...this.state.newGame,
      description: event.target.value,
    }
  });

  handleNewGamePlayersChange = event => this.setState({
    newGame: {
      ...this.state.newGame,
      players: event.target.value,
    }
  });

  handleNewGamePublisherChange = event => this.setState({
    newGame: {
      ...this.state.newGame,
      publisher: event.target.value,
    }
  });

  handleNewGameCategoryChange = event => this.setState({
    newGame: {
      ...this.state.newGame,
      category: event.target.value,
    }
  });

  handleNewGameImageChange = event => this.setState({
    newGame: {
      ...this.state.newGame,
      image: event.target.value,
    }
  });

  handleNewGameStatusChange = event => this.setState({
    newGame: {
      ...this.state.newGame,
      status: event.target.value,
    }
  });

  handleNewGameAdd = () => {
    fetch(SERVER_HOST, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.newGame),
    })
      .then(response => response.json())
      .then(newGame => this.setState({
        data: {
          ...this.state.data,
          list: [newGame, ...this.state.data.list]
        },
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
        <AppBar position="static" color="default">
          <Toolbar>
            <FormControl style={{ width: 150 }}>
              <InputLabel htmlFor="sortBy">Sortowanie</InputLabel>
              <Select
                value={sortBy || ''}
                onChange={this.handleSortByChange}
                inputProps={{
                  name: 'sortBy',
                  id: 'sortBy',
                }}
              >
                <MenuItem value="title">Tytuł</MenuItem>
                <MenuItem value="publisher">Wydawca</MenuItem>
                <MenuItem value="category">Kategoria</MenuItem>
              </Select>
            </FormControl>
            <TextField
              value={title}
              style={{ width: 150, marginLeft: 16 }}
              label="Tytuł"
              onChange={this.handleTitleFilterChange}
            />
            <Fab color="secondary" style={{ position: 'absolute', right: 0 }}>
              <AddIcon onClick={this.handleOpenAddDialog}/>
            </Fab>
          </Toolbar>
        </AppBar>
        <Dialog
          open={this.state.addDialogOpen}
          onClose={this.handleCloseAddDialog}
        >
          <DialogTitle>Dodaj nową pozycję</DialogTitle>
          <DialogContent>
            <TextField label="Tytuł" onChange={this.handleNewGameTitleChange} autoFocus fullWidth />
            <TextField label="Opis" onChange={this.handleNewGameDescriptionChange} fullWidth />
            <TextField label="Wydawnictwo" onChange={this.handleNewGamePublisherChange} fullWidth />
            <TextField label="Kategoria" onChange={this.handleNewGameCategoryChange} fullWidth />
            <TextField label="Ilość graczy" onChange={this.handleNewGamePlayersChange} fullWidth />
            <TextField label="Zdjęcie" onChange={this.handleNewGameImageChange} fullWidth />
            <FormControl fullWidth>
              <InputLabel htmlFor="status">Status</InputLabel>
              <Select
                value={this.state.newGame.status || ''}
                onChange={this.handleNewGameStatusChange}
                inputProps={{
                  name: 'status',
                  id: 'status',
                }}
              >
                <MenuItem value="HOME">W kolekcji</MenuItem>
                <MenuItem value="BORROWED">Pożyczona</MenuItem>
                <MenuItem value="WISH">Lista życzeń</MenuItem>
                <MenuItem value="LOST">Zgubiona</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseAddDialog} color="secondary">
              Anuluj
            </Button>
            <Button onClick={this.handleNewGameAdd} color="primary">
              Dodaj
            </Button>
          </DialogActions>
        </Dialog>
        <Grid style={{ padding: 24 }} container spacing={24}>
        {this.state.data.list.map((game, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="200"
                  style={{ objectFit: 'contain' }}
                  image={game.image}
                  title={game.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {game.title}
                  </Typography>
                  <Typography component="p">
                    Opis: {game.description}
                  </Typography>
                  <Typography component="p">
                    Ilość graczy: {game.players}
                  </Typography>
                  <Typography component="p">
                    Wydawca: {game.publisher}
                  </Typography>
                  <Typography component="p">
                    Kategoria: {game.category}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
        </Grid>
      </div>
    );
  }
}

export default App;
