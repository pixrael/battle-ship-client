import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import shipImag from '../assets/ship.jpg';
import axios from "axios";


const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    marginTop: 100
  },
  button: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    marginTop: '10px'
  },
  title: {
    textAlign: 'center',

  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%'

  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    width: '100%'
  },
}));


function MainPage() {

  const classes = useStyles();
  const [gameMode, setGameMode] = React.useState('easy');
  const [nShots, setNShots] = React.useState(500);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGameMode(event.target.value);
  };

  const handleNShotsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNShots(+event.target.value)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      mode: gameMode,
      'n-shots': nShots
    };
    axios
      .post("http://localhost:3001/games", data)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.title} variant="h5" component="h2">
              Battleship
            </Typography>
            <CardMedia
              image={shipImag}
              className={classes.media}
              title="Paella dish"
            />

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
                <MenuItem value={'easy'}>Easy (infinite shots)</MenuItem>
                <MenuItem value={'medium'}>Medium (100 shots)</MenuItem>
                <MenuItem value={'hard'}>Hard (50 shoots)</MenuItem>
                <MenuItem value={'custom'}>Custom (you select how many shots)</MenuItem>
              </Select>
              {
                gameMode === 'custom' &&
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
                Create game
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </React.Fragment>
  );
}

export default MainPage;
