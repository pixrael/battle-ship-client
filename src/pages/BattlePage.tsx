import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import io from 'socket.io-client';
import { Button } from '@material-ui/core';
import WavesIcon from '@material-ui/icons/Waves';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import GridOffIcon from '@material-ui/icons/GridOff';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';

const socket = io('http://localhost:3001');

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
  leftPaneHud: {
    width: '50%',
    float: 'left'
  },
  rightPaneHud: {
    width: '50%',
    float: 'left'
  },
  firstRowPane: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  buttonFinishGame: {
    color: 'white',
    width: 150
  }

}));


function BattlePage(props) {
  const history = useHistory();
  const classes = useStyles();
  const [board, setBoard] = React.useState([]);
  const [shipsData, setShipsData] = React.useState([]);
  const [remainingAttemps, setRemainingAttemps] = React.useState('');
  const [battleId, setBattleId] = React.useState('');
  const [battleState, setBattleState] = React.useState('IN_PROGRESS');
  const [madeShots, setMadeShots] = React.useState([]);

  const handleButtonClick = (r, c) => {

    if (!madeShots.some(shot => shot.r === r && shot.c === c)) {
      setMadeShots([...madeShots, { r, c }])
      socket.emit('shot', { row: r, column: c, battleId });
    }

  }


  useEffect(() => {
    setBattleId(props.battleId.match.params.id)

    socket.emit('join-game', { battleId: props.battleId.match.params.id });
    socket.on('joined', (msg) => {
      console.log('joined ', msg.board)
      setBoard(msg.board)
      setShipsData(msg.shipsData)
      const remAttemps = msg.nAttempsData.infinite ? 'infinite' : msg.nAttempsData.nMaxAttemps - msg.nAttempsData.nAttemps
      setRemainingAttemps(remAttemps + '')
      setBattleState(msg.battleState)
    })

    socket.on('current-state', (msg) => {
      console.log('msg ', msg)
      console.log('board ', msg.board)
      setBoard(msg.board)
      setShipsData(msg.shipsData)
      const remAttemps = msg.nAttempsData.infinite ? 'infinite' : msg.nAttempsData.nMaxAttemps - msg.nAttempsData.nAttemps
      setRemainingAttemps(remAttemps + '')
      setBattleState(msg.battleState)
    })

    socket.on('not-joined', (msg) => {
      history.push(`/`)
    })

  }, []);

  const boardHTML = [];

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {

      let iconHTML;
      let buttonClass;
      let disabled = true
      if (board[i][j] === 0) {
        iconHTML = < WavesIcon />
        buttonClass = classes.buttonSea
        disabled = false
      } else if (board[i][j] >= -4 && board[i][j] <= -1) {
        iconHTML = < Brightness7Icon />
        buttonClass = classes.buttonHit
      } else if (board[i][j] >= -40 && board[i][j] <= -10) {
        iconHTML = < GridOffIcon />
        buttonClass = classes.buttonDestroyed
      }
      else/*  if (board[i][j] === -100) */ {
        iconHTML = < BlurOnIcon />
        buttonClass = classes.buttonMiss
      }


      if (battleState === 'GAME_OVER' || battleState === 'GAME_WIN')
        disabled = true


      let buttonHTML = <Button
        key={`${i}${j}`}
        onClick={() => handleButtonClick(i, j)}
        variant="contained"
        color="primary"
        className={buttonClass}
        startIcon={iconHTML}
        disabled={disabled}

      >
      </Button>;
      boardHTML.push(buttonHTML)

      if (j === board[0].length - 1) {
        boardHTML.push(<br key={`b${i}${j}`} />)
      }

    }
  }


  const leftShipData = []
  const rightShipData = []


  shipsData.forEach((shipData, i) => {
    const status = shipData.destroyed ? 'destroyed' : ''
    if (i < shipsData.length / 2) {
      leftShipData.push(<div key={i} > {shipData.type} - {status} </div>)
    } else {
      rightShipData.push(<div key={i} > {shipData.type} - {status} </div>)
    }
  })


  let gameOverHTML = <></>;

  if (battleState === 'GAME_OVER') {
    gameOverHTML = <><Typography className={classes.title} variant="h5" component="h2">
      Game Over
    </Typography>
      <Typography className={classes.title} variant="h5" component="h2">
        <div>
          <Button className={classes.buttonFinishGame} variant="contained" color="primary" onClick={() => history.push('/')} >
            Main Menu
          </Button>
        </div>
      </Typography></>
  }

  let gameWinHTML = <></>;

  if (battleState === 'GAME_WIN') {
    gameWinHTML = <><Typography className={classes.title} variant="h5" component="h2">
      YOU WIN!!!
    </Typography>
      <Typography className={classes.title} variant="h5" component="h2">
        <div>
          <Button className={classes.buttonFinishGame} variant="contained" color="primary" onClick={() => history.push('/')} >
            Main Menu
          </Button>
        </div>
      </Typography></>
  }



  const hudHTML = <div>
    <div className={classes.firstRowPane}>{`Remaining attemps: ${remainingAttemps}`}</div>
    <div className={classes.leftPaneHud}>{leftShipData}</div>
    <div className={classes.rightPaneHud}>{rightShipData}</div>
  </div>



  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.title} variant="h5" component="h2">
              Battle
            </Typography>
            <Typography className={classes.title} variant="h5" component="h2">
              {
                boardHTML
              }
            </Typography>
            {gameOverHTML}
            {gameWinHTML}
            <Typography className={classes.title} variant="body2" component="h2">
              {hudHTML}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </React.Fragment>
  );
}

export default BattlePage;
