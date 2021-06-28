import React from 'react';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    marginTop: theme.spacing(2),
    width: '100%'
  },
  button: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    marginTop: '10px'
  },
}));


function CreateBattleForm({ onSubmit }) {

  const classes = useStyles();
  const [gameMode, setGameMode] = React.useState('EASY');
  const [nShots, setNShots] = React.useState(500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGameMode(event.target.value);
  };

  const handleNShotsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNShots(+event.target.value)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(gameMode, nShots);
  };

  return (
    <form id="my-form-id" onSubmit={handleSubmit}>
      <InputLabel shrink id="game-mode-label">
        Game difficulty
      </InputLabel>
      <Select
        labelId="select-game-mode-label"
        id="select-game-mode"
        value={gameMode}
        onChange={handleChange}
        displayEmpty
        className={classes.selectEmpty}
      >
        <MenuItem value={'EASY'}>Easy (infinite shots)</MenuItem>
        <MenuItem value={'MEDIUM'}>Medium (100 shots)</MenuItem>
        <MenuItem value={'HARD'}>Hard (50 shoots)</MenuItem>
        <MenuItem value={'CUSTOM'}>Custom (you select how many shots)</MenuItem>
      </Select>
      {
        gameMode === 'CUSTOM' &&
        <TextField
          id="shots-textfield"
          label="Shots:"
          type="number"
          value={nShots}
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{ inputProps: { min: 1, max: 10000 } }}
          onChange={handleNShotsChange}
        />
      }
      <Button className={classes.button} variant="contained" color="primary" type="submit" >
        Create battle
      </Button>
    </form>
  );
}

export default CreateBattleForm;
