import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

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
    if (!this.state || !this.state.list) {
      return (
        <CircularProgress />
      );
    }

    return (
      <div>
        <Grid style={{ padding: 24 }} container spacing={24}>
        {this.state.list.map((game, index) => (
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
