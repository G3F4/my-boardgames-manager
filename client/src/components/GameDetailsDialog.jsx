import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import Game from './Game';

const GameDetailsDialog = ({ open, game, onClose, onDelete, onEdit }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogContent>
      <Game game={game} onDelete={onDelete} onEdit={onEdit} />
    </DialogContent>
  </Dialog>
);

export default GameDetailsDialog;
