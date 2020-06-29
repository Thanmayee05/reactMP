import React from 'react';
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
import pic3 from '../../images/20200307064735-WD10copy.jpeg';
//import lPic from '../../images/IMGBIN_holding-hands-stock-photography-png_de7vvb5s.png';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  makeStyles,
} from '@material-ui/core';
//import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function Copyright() {
  return (
    <Typography variant="body2" float="center">
      <span
        style={{
          fontFamily: 'cursive',
          fontSize: '23px',
          fontWeight: 'bold',
          textShadow: '0 0 5px #FF0000, 0 0 5px #0000FF',
        }}
      >
        {'#BeAlertBeSafe'}
        {/*<span style={{ color: 'blue' }}>{'Help'}</span>
        {new Date().getFullYear()}*/}
      </span>
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  roo1: {
    maxWidth: 800,
  },
  media: {
    height: 200,
  },
}));

const LandingPage = () => {
  const classes = useStyles();
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
            <Typography
              style={{
                fontFamily: 'Copperplate Gothic ',
                color: 'white',
                fontSize: '80px',
                marginLeft: '120px',
              }}
            >
              Welcome to SheHelp
            </Typography>
            <div className="imgSlide">
              <SimpleImageSlider
                width={1000}
                height={500}
                images={images}
                slideDuration={1}
                navStyle={1}
              />
            </div>
            <div
              style={{
                textAlign: 'center',
                margin: '50px',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '1100px',
                  justifyContent: 'center',
                  display: 'flex',
                  //flexDirection: 'vertical',
                  marginLeft: '150px',
                  marginTop: '50px',
                }}
              >
                <Card className={classes.root1}>
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="h2"
                      style={{
                        fontStyle: 'Constantia',
                        fontWeight: 'bold',
                        fontSize: '40px',
                      }}
                    >
                      IS YOUR CITY SAFE FOR WOMEN?
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      Let's see what Women Safety is..
                    </Typography>
                    <img src={pic3} alt="img" />
                    <Typography
                      variant="body1"
                      component="p"
                      style={{ fontFamily: 'Comic Sans MS', fontSize: '16px' }}
                    >
                      Women’s safety involves safe spaces. Space is not neutral.
                      Space which causes fear restricts movement and thus the
                      community’s use of the space. Lack of movement and comfort
                      is a form of social exclusion. Conversely, space can also
                      create a sensation of safety and comfort, and can serve to
                      discourage violence. Therefore planning and policy around
                      safety should always involve and consider women.
                      <br />
                    </Typography>
                    <Typography
                      variant="body2"
                      component="p"
                      style={{ fontFamily: 'Comic Sans MS', fontSize: '16px' }}
                    >
                      Women’s safety means a safer, healthier community for
                      everyone. This is a participatory process focused on
                      changing community norms, patterns of social interaction,
                      values, customs and institutions in ways that will
                      significantly improve the quality of life in a community
                      for all of its members . This is a natural by-product of
                      efforts that attempt to address issues such as family
                      dynamics, relationships, poverty, racism and/or ending
                      sexual violence. Building a healthy, safe community is
                      everyone’s job
                      <br />
                      <div style={{ fontSize: '30px' }}>
                        {'"Yes, Women Deserve SAFETY!"'}
                      </div>
                    </Typography>
                  </CardContent>
                </Card>
              </div>
              <br />

              <div style={{ textAlign: 'center', marginLeft: '130px' }}>
                Want to help in contributing something to our city?
                <br />
                Come and join SheHelp..Let's take the following steps to make
                our city safe and better place to live
                <br />
              </div>
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
                        title="View Danger Zones"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Are you going to a new place?
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          Have a look at this map to see how safe your
                          destination is going to be and take necessary
                          precautions. Be Your Own Super Hero!
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
                        title="Image Upload"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Witnessed any unusual incident?
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          Bring to SheHelp's notice.. Let everyone know that
                          something's worng in that place. Just upload picture
                          of that location.
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
                        title="Add Danger Zone"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Add a danger zone at the location.
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          Preview the location you want to make as a danger zone
                          and add a marker after confirming. Let's help Each
                          Other!
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          color: 'white',
          bottom: '0px',
          position: 'fixed',
          left: '650px',
        }}
      >
        <Copyright />
      </div>
    </div>
  );
};

export default LandingPage;
