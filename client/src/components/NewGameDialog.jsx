import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import { STATUSES_MAP } from '../constans';

class NewGameDialog extends Component {
  handleNewGameTitleChange = event => this.props.onNewGameChange('title', event.target.value);

  handleNewGameDescriptionChange = event => this.props.onNewGameChange('description', event.target.value);

  handleNewGamePlayersChange = event => this.props.onNewGameChange('players', event.target.value);

  handleNewGamePublisherChange = event => this.props.onNewGameChange('publisher', event.target.value);

  handleNewGameCategoryChange = event => this.props.onNewGameChange('category', event.target.value);

  handleNewGameImageChange = event => this.props.onNewGameChange('image', event.target.value);

  handleNewGameStatusChange = event => this.props.onNewGameChange('status', event.target.value);

  render() {
    const { open, newGame, onCloseDialog, onNewGameAdd } = this.props;
    const { title ='', description ='', category ='', publisher ='', players ='', image ='', status ='' } = newGame;

    return (
      <Dialog open={open} onClose={onCloseDialog}>
        <DialogTitle>Dodaj nową pozycję</DialogTitle>
        <DialogContent>
          <TextField value={title} label="Tytuł" onChange={this.handleNewGameTitleChange} autoFocus fullWidth />
          <TextField value={description} label="Opis" onChange={this.handleNewGameDescriptionChange} fullWidth />
          <TextField value={publisher} label="Wydawnictwo" onChange={this.handleNewGamePublisherChange} fullWidth />
          <TextField value={category} label="Kategoria" onChange={this.handleNewGameCategoryChange} fullWidth />
          <TextField value={players} label="Ilość graczy" onChange={this.handleNewGamePlayersChange} fullWidth />
          <TextField value={image} label="Zdjęcie" onChange={this.handleNewGameImageChange} fullWidth />
          <FormControl fullWidth>
            <InputLabel htmlFor="status">Status</InputLabel>
            <Select
              value={status}
              onChange={this.handleNewGameStatusChange}
              inputProps={{ id: 'status' }}
            >
              {Object.keys(STATUSES_MAP).map(key => (
                <MenuItem value={key} key={key}>{STATUSES_MAP[key]}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDialog} color="secondary">Anuluj</Button>
          <Button onClick={onNewGameAdd} color="primary">Dodaj</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default NewGameDialog;
