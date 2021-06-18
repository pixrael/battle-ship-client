import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import shipImag from '../assets/ship.jpg';

const useStyles = makeStyles({
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
});


function MainPage() {

  const classes = useStyles();
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
            <Button className={classes.button} variant="contained" color="primary">
              Create game
            </Button>
          </CardContent>
        </Card>
      </Container>
    </React.Fragment>
  );
}

export default MainPage;
