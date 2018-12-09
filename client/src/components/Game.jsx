import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { STATUSES_MAP } from '../constans';

const Game = ({ game, onDelete, onDetails, onEdit }) => (
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
    <CardActions>
      <Button size="small" color="primary" onClick={() => onDelete(game._id)}>Usuń</Button>
      <Button size="small" color="primary" onClick={() => onEdit(game)}>Edytuj</Button>
      {onDetails && (
        <Button size="small" color="primary" onClick={() => onDetails(game._id)}>Szczegóły</Button>
      )}
    </CardActions>
  </Card>
);

export default Game;
