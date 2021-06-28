import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    marginTop: 100
  },
  title: {
    textAlign: 'center',
  },
  button: {
    minWidth: 10,
    minHeight: 10,
    width: 30,
    height: 38,
    paddingLeft: 26,
    color: '#4154b9',
    borderRadius: 0
  },
  buttonSea: {
    color: '#5e69a5',
    minWidth: 10,
    minHeight: 10,
    width: 30,
    height: 38,
    paddingLeft: 26,
    borderRadius: 0,
    boxShadow: '0 0 #3f51b5'
  },
  buttonMiss: {
    minWidth: 10,
    minHeight: 10,
    width: 30,
    height: 38,
    paddingLeft: 26,
    color: '#8d98d3 !important',
    borderRadius: 0,
    backgroundColor: '#3f51b5 !important'
  },
  buttonHit: {
    minWidth: 10,
    minHeight: 10,
    width: 30,
    height: 38,
    paddingLeft: 26,
    color: '#990000',
    borderRadius: 0,
    backgroundColor: '#3f51b5 !important'
  },
  buttonDestroyed: {
    minWidth: 10,
    minHeight: 10,
    width: 30,
    height: 38,
    paddingLeft: 26,
    color: '#000000',
    borderRadius: 0,
    backgroundColor: '#3f51b5 !important'
  },
  buttonFinishGame: {
    color: 'white',
    width: 150
  }

}));

function EndGamePane({ battleState, mainMenuRedirectCallback }) {

  const classes = useStyles();

  if (battleState !== 'GAME_OVER' && battleState !== 'GAME_WIN')
    return <></>


  let msg = '';
  if (battleState === 'GAME_OVER')
    msg = 'Game Over'
  else if (battleState === 'GAME_WIN') {
    msg = 'You Win!!!'
  }


  return (<>
    <Typography className={classes.title} variant="h5" component="h2">
      {msg}
    </Typography>
    <Typography className={classes.title} variant="h5" component="h2">
      <div>
        <Button className={classes.buttonFinishGame} variant="contained" color="primary" onClick={mainMenuRedirectCallback} >
          Main Menu
        </Button>
      </div>
    </Typography>
  </>
  );
}

export default EndGamePane;
