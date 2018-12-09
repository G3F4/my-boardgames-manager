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

class GameEditorDialog extends Component {
  handleNewGameTitleChange = event => this.props.onChange('title', event.target.value);

  handleNewGameDescriptionChange = event => this.props.onChange('description', event.target.value);

  handleNewGamePlayersChange = event => this.props.onChange('players', event.target.value);

  handleNewGamePublisherChange = event => this.props.onChange('publisher', event.target.value);

  handleNewGameCategoryChange = event => this.props.onChange('category', event.target.value);

  handleNewGameImageChange = event => this.props.onChange('image', event.target.value);

  handleNewGameStatusChange = event => this.props.onChange('status', event.target.value);

  render() {
    const { open, game, onClose, onSave } = this.props;
    const { title ='', description ='', category ='', publisher ='', players ='', image ='', status ='' } = game;

    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Edytor</DialogTitle>
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
          <Button onClick={onClose} color="secondary">Anuluj</Button>
          <Button onClick={onSave} color="primary">Zapisz</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default GameEditorDialog;
