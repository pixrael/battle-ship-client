import React from 'react';
import { useEffect } from 'react';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import io from 'socket.io-client';
import { useHistory } from "react-router-dom";

import Hud from '../components/Hud'
import EndGamePane from '../components/EndGamePane';
import Board from '../components/Board';

const socket = io('http://localhost:3001');

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    marginTop: 100
  },
  title: {
    textAlign: 'center',
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


  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.title} variant="h5" component="h2">
              Battle
            </Typography>
            <Typography className={classes.title} variant="h5" component="h2">
              <Board board={board} battleState={battleState} handleCellClick={handleButtonClick} />
            </Typography>
            <EndGamePane battleState={battleState} mainMenuRedirectCallback={() => history.push('/')} />
            <Typography className={classes.title} variant="body2" component="h2">
              <Hud shipsData={shipsData} remainingAttemps={remainingAttemps} />
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </React.Fragment>
  );
}

export default BattlePage;
