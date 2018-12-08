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

const SERVER_HOST = 'http://localhost:3000/';

class App extends Component {
  state = {
    data: null,
    sortBy: '',
    title: ''
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
            <form autoComplete="off">
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
              <FormControl style={{ width: 150, marginTop: 0 }}>
                <TextField
                  value={title}
                  style={{ marginLeft: 16 }}
                  label="Tytuł"
                  onChange={this.handleTitleFilterChange}
                />
              </FormControl>
            </form>
          </Toolbar>
        </AppBar>
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
                    Ilość graczy: {game.players[0]} - {game.players[1]}
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
