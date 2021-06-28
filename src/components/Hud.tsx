import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
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
  }
}));

function Hud({ shipsData, remainingAttemps }) {
  const classes = useStyles();

  const leftShipData = []
  const rightShipData = []


  shipsData.forEach((shipData: { type: string, destroyed: boolean }, i: number) => {
    const status = shipData.destroyed ? 'destroyed' : ''
    if (i < shipsData.length / 2) {
      leftShipData.push(<div key={i} > {shipData.type} - {status} </div>)
    } else {
      rightShipData.push(<div key={i} > {shipData.type} - {status} </div>)
    }
  })


  return (
    <div>
      <div className={classes.firstRowPane}>{`Remaining attemps: ${remainingAttemps}`}</div>
      <div className={classes.leftPaneHud}>{leftShipData}</div>
      <div className={classes.rightPaneHud}>{rightShipData}</div>
    </div>
  );
}

export default Hud;
