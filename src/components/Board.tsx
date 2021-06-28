import { makeStyles } from '@material-ui/core/styles';
import WavesIcon from '@material-ui/icons/Waves';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import GridOffIcon from '@material-ui/icons/GridOff';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(() => ({
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
  }
}));

function Board({ board, battleState, handleCellClick }) {
  const classes = useStyles();

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
      else {
        iconHTML = < BlurOnIcon />
        buttonClass = classes.buttonMiss
      }


      if (battleState === 'GAME_OVER' || battleState === 'GAME_WIN')
        disabled = true


      let buttonHTML = <Button
        key={`${i}${j}`}
        onClick={() => handleCellClick(i, j)}
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

  return <>{boardHTML}</>
}

export default Board;
