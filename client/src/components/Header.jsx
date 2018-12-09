import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

const Header = ({ sortBy, title, onSortByChange, onTitleFilterChange, onOpenAddDialog }) => (
  <AppBar position="static" color="default">
    <Toolbar>
      <FormControl style={{ width: 150 }}>
        <InputLabel htmlFor="sortBy">Sortowanie</InputLabel>
        <Select
          value={sortBy || ''}
          onChange={onSortByChange}
          inputProps={{ id: 'sortBy' }}
        >
          <MenuItem value="title">Tytuł</MenuItem>
          <MenuItem value="publisher">Wydawca</MenuItem>
          <MenuItem value="category">Kategoria</MenuItem>
        </Select>
      </FormControl>
      <TextField
        value={title}
        style={{ width: 150, marginLeft: 24 }}
        label="Tytuł"
        onChange={onTitleFilterChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Fab color="secondary" style={{ position: 'absolute', right: 0, marginRight: 24 }}>
        <AddIcon onClick={onOpenAddDialog}/>
      </Fab>
    </Toolbar>
  </AppBar>
);

export default Header;

