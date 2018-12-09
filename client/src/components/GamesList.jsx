import React from 'react';
import Grid from '@material-ui/core/Grid';
import Game from './Game';

const GamesList = ({ list, onDelete, onDetails, onEdit }) => (
  <Grid style={{ padding: 24 }} container spacing={24}>
  {list.map((game) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={game._id}>
      <Game game={game} onDelete={onDelete} onDetails={onDetails} onEdit={onEdit} />
    </Grid>
  ))}
  </Grid>
);

export default GamesList;
