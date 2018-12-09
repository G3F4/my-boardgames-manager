import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { STATUSES_MAP } from '../constans';

const GamesList = ({ list, }) => (
  <Grid style={{ padding: 24 }} container spacing={24}>
    {list.map((game) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={game.id}>
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              height="200"
              style={{ objectFit: 'contain' }}
              image={game.image}
              title={game.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">{game.title}</Typography>
              <Typography component="p">Status: {STATUSES_MAP[game.status]}</Typography>
              <Typography component="p">Opis: {game.description}</Typography>
              <Typography component="p">Ilość graczy: {game.players}</Typography>
              <Typography component="p">Wydawca: {game.publisher}</Typography>
              <Typography component="p">Kategoria: {game.category}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default GamesList;
