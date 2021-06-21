import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Modal from '@material-ui/core/Modal';
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from "axios";
import CreateBattleForm from '../components/CreateBattleForm'
import shipImag from '../assets/ship.jpg';


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    marginTop: 100
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
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modalText: {
    textAlign: 'center'
  }
}));


function BattlePage(props) {
  console.log('battle id  ', props.battleId.match.params.id);





  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [modalError, setModalError] = React.useState({ error: false, type: '' });
  let battleId = '';

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    (modalError.error || battleId) && setOpen(false);
    setModalError({ error: false, type: '' })
  };


  const handleSubmit = (gameMode, nShots) => {
    const data = {
      mode: gameMode,
      'n-shots': nShots
    };

    setModalError({ error: false, type: '' });
    battleId = '';

    handleOpen();

    axios
      .post("http://localhost:3001/games", data, { timeout: 3000 })
      .then(res => {
        battleId = res.data.battleId;
        handleClose();
      })
      .catch(err => {
        setModalError({ error: true, type: err + '' });
      });
  };

  const loadingModalHTML = <> <p id="simple-modal-description" className={classes.modalText} >
    Creating battle ...
  </p>
    <LinearProgress /></>

  const errorModalHTML = <> <p id="simple-modal-description" className={classes.modalText} >
    Could not create the battle... {modalError.type}
  </p>
  </>


  const body = (
    <div style={modalStyle} className={classes.paper}>
      {
        !modalError.error && loadingModalHTML
      }
      {
        modalError.error && errorModalHTML
      }
    </div>
  );

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.title} variant="h5" component="h2">
              Battle page !!!!!!!!!!!!!!!!!
            </Typography>
            {/*  <CardMedia
              image={shipImag}
              className={classes.media}
              title="Paella dish"
            />

            <CreateBattleForm onSubmit={handleSubmit} /> */}
          </CardContent>
        </Card>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </React.Fragment>
  );
}

export default BattlePage;
