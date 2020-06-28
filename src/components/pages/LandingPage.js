import React from 'react';
//import { Redirect } from 'react-router-dom';
/*import { BrowserRouter as Router,NavLink,Switch,Route } from 'react-router-dom';
import About from './About';
import Login from './Login';*/
import SimpleImageSlider from 'react-simple-image-slider';
import './landing.css';
import gPic from '../../images/gandhisays.jpg';
import sPic from '../../images/strong.jpg';
import wPic from '../../images/womenStrong.jpg';
import mPic from '../../images/malala2.png';
import tPic from '../../images/protection3.jpg';
import oPic from '../../images/obama2.jpg';
import hPic from '../../images/hyderabad-pinned-on-a-map-of-india-H101WJ.jpg';
import rPic from '../../images/roadsspic.png';
import pic2 from '../../images/0lupQ.png';
//import lPic from '../../images/IMGBIN_holding-hands-stock-photography-png_de7vvb5s.png';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  //CardActions,
  //IconButton,
  Typography,
  makeStyles,
} from '@material-ui/core';
//import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
});

const LandingPage = () => {
  const classes = useStyles();
  //const [expanded, setExpanded] = React.useState(false);

  /*const handleExpandClick = () => {
    setExpanded(!expanded);
  };*/

  const images = [
    { url: tPic },
    { url: sPic },
    { url: mPic },
    { url: wPic },
    { url: gPic },
    { url: oPic },
  ];

  return (
    <div>
      <div className="landingbg">
        <div
          style={{
            fontSize: '30px',
            display: 'flex',
          }}
        >
          <div
            style={{
              fontSize: '25px',
              color: 'white',
              flexDirection: 'row',
              textAlign: 'center',
            }}
          >
            Fear to travel alone?
            <div className="imgSlide">
              <SimpleImageSlider
                width={1000}
                height={500}
                images={images}
                slideDuration={1}
                navStyle={1}
              />
            </div>
            <div style={{ textAlign: 'center', margin: '50px' }}>
              <span style={{ textAlign: 'center' }}>What SheHelp is?</span>
              <div
                style={{
                  justifyContent: 'center',
                  display: 'flex',
                  flexDirection: 'vertical',
                  marginLeft: '130px',
                  marginTop: '50px',
                }}
              >
                <div style={{}}>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        component="img"
                        image={pic2}
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Are you going to any location?
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          Have a look at this map to see how safe your
                          destination is going to be
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
                <div style={{ marginLeft: '50px' }}>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        component="img"
                        image={rPic}
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Witnessed any unusual scene?
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          Bring to everyone's notice. Just upload picture of
                          that location.
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
                <div style={{ marginLeft: '50px' }}>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        component="img"
                        image={hPic}
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Add A Danger Zone and help others!
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          Preview the location you want to make as a danger zone
                          and add a marker after confirming
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
