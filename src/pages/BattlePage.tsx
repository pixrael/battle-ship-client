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
    borderRadius: 0
  },
  buttonMiss: {
    minWidth: 10,
    minHeight: 10,
    width: 30,
    height: 38,
    paddingLeft: 26,
    color: '#939bc7',
    borderRadius: 0
  },
  buttonHit: {
    minWidth: 10,
    minHeight: 10,
    width: 30,
    height: 38,
    paddingLeft: 26,
    color: '#990000',
    borderRadius: 0
  },
  buttonDestroyed: {
    minWidth: 10,
    minHeight: 10,
    width: 30,
    height: 38,
    paddingLeft: 26,
    color: '#000000',
    borderRadius: 0
  },

}));


function BattlePage(props) {
  const classes = useStyles();
  const [board, setBoard] = React.useState([]);

  const handleButtonClick = (r, c) => {
    socket.emit('shot', { row: r, column: c });
  }



  useEffect(() => {
    socket.emit('join-battle', { battleId: props.battleId.match.params.id });
    socket.on('joined', (msg) => {
      console.log('joined ', msg.board)
      setBoard(msg.board)
    })

    socket.on('current-state', (msg) => {
      console.log('current-state ', msg.board)
      setBoard(msg.board)
    })

  }, []);

  const boardHTML = [];

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {

      let iconHTML;
      let buttonClass;
      if (board[i][j] === 0) {
        iconHTML = < WavesIcon />
        buttonClass = classes.buttonSea
      } else if (board[i][j] >= -4 && board[i][j] <= -1) {
        iconHTML = < Brightness7Icon />
        buttonClass = classes.buttonHit
      } else if (board[i][j] === -30) {
        iconHTML = < GridOffIcon />
        buttonClass = classes.buttonDestroyed
      }
      else/*  if (board[i][j] === -100) */ {
        iconHTML = < BlurOnIcon />
        buttonClass = classes.buttonMiss
      }

      let buttonHTML = <Button
        key={`${i}${j}`}
        onClick={() => handleButtonClick(i, j)}
        variant="contained"
        color="primary"
        className={buttonClass}
        startIcon={iconHTML}

      >
      </Button>;
      boardHTML.push(buttonHTML)

      if (j === board[0].length - 1) {
        boardHTML.push(<br key={`b${i}${j}`} />)
      }

    }
  }

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
          </CardContent>
        </Card>
      </Container>
    </React.Fragment>
  );
}

export default BattlePage;
