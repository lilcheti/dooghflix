import logo from './logo.svg';
import './App.css';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardDeck } from 'react-bootstrap';
import { GridListTile, GridList,Grid, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Select, MenuItem, FormControl, } from '@material-ui/core';
import Flatlist from 'flatlist-react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { CenterFocusStrong } from '@material-ui/icons';
import {  BrowserRouter as Router,Route, Switch, useParams, Link, NavLink } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useEffect, useState } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import CopyToClipboard from 'react-copy-to-clipboard';
import axios from 'axios';
const kkkk = ''
const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFFFF',

    },
    secondary: {
      light: '#FFFF',
      main: '#FFFFF',
      dark: '#FFFF',
      contrastText: '#000',
    },
  },
});

const useStyles = makeStyles((theme) =>({
  root: {
    width: 315,
    margin: 10,
  },
  media: {
    height: 140,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    width: 205,
  },
  bb:{
    width: '100%',
  },
  gridd: {
    backgroundColor: theme.palette.primary.light,
    width:'100%',
    marginTop:5,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(3),
    width: '100%',
  },
  button:{
    backgroundColor: theme.palette.background.paper,
  }
}));
function Showw(){
  const classes = useStyles();
  const [data,setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://doogh.club/all',
      );
      localStorage.setItem('data',JSON.stringify(result.data))
      setData(result.data);
    }
    if (!data){
    fetchData();}
  }, []);
  if (data){
return(
  <Grid container className={classes.grid} justify = "center" alignItems = "center">
          {data.map((value, index) => {
            if (!!value){
              
            }
            if (value.type === "series"){
          return <Card className={classes.root}>
  <CardActionArea>
    <CardMedia
      className={classes.media}
      image={value.image}
      title={value.title}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
      {value.title}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
      {value.about}
      </Typography>
    </CardContent>
  </CardActionArea>
  <CardActions>
    <Button size="small" color="primary">
      Share
    </Button>
    <Button size="small" color="primary">
      Learn More
    </Button>
  </CardActions>
  <CardActions>
    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Show links</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <div className={classes.bb}>
          {value.seasons.reduce((result,v,indexx) =>{

            if (JSON.stringify(v)!='{"episodes":[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]}'){
              
              result.push(<Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>{"Season "+(indexx+1)}</Typography>
                </AccordionSummary>
                <AccordionDetails>
              
                <List className={classes.heading}>
                {v.episodes.reduce((result,value, indexxx) => {
                  if (value && value.length > 0){
                    result.push(<ListItem>
                      <ListItemText
                             primary={"Episode "+(indexxx+1)}
                             secondary={"test"}
                           />
                           <ListItemSecondaryAction>
                             <IconButton edge="end" aria-label="play" component={Link} to={"/video/"+index+"/"+indexx+"/"+indexxx}>
                               <PlayArrowIcon />
                             </IconButton>
                           </ListItemSecondaryAction>
                   </ListItem>);
                  }
              return result;
            }, [])}
                </List>
               
                </AccordionDetails>
            </Accordion>);
            
            }
            return result;
          }, [])}
        </div>
        </AccordionDetails>
    </Accordion>
  </CardActions>
  
</Card>}else{
  return <Card className={classes.root}>
  <CardActionArea>
    <CardMedia
      className={classes.media}
      image={value.image}
      title={value.title}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
      {value.title}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
      {value.about}
      </Typography>
    </CardContent>
  </CardActionArea>
  <CardActions>
    <Button size="small" color="primary">
      Share
    </Button>
    <Button size="small" color="primary">
      Learn More
    </Button>
    <IconButton edge="end" aria-label="play" component={Link} to={"/video/"+index+"/0/0/"}>
                      <PlayArrowIcon />
                    </IconButton>
  </CardActions>
  
</Card>
}
})}    </Grid>
);
}else{return null}}

function Home(){
  const classes = useStyles();
  return(<div className="App">
  <header className="App-header">
  </header>
  <body className="body">
  <Showw className="cards"/>
  </body>
</div>);
}
function Video(){
  
  const [copy,setCopy] = useState('Copy link');
  const classes = useStyles();
  let {id,s,e} = useParams();
  const [data,setData] = useState(JSON.parse(localStorage.getItem('data')));
  //console.log(localStorage.getItem('data'));
  const [link,setLink] = useState(data[id].seasons[s].episodes[e][0]);
  console.log(link);
  if (data){
  //setLink(data[id].seasons[s].episodes[e][0]);
  const handleChange = (event) => {
    setLink(event.target.value);
    setCopy('Copy link');
  };
  const handleNext = () => {
    setLink(data[id].seasons[s].episodes[Number(e)+1][0] ? data[id].seasons[s].episodes[Number(e)+1][0] : data[id].seasons[Number(s)+1].episodes[0][0])
  };
  return(
    
    <ThemeProvider theme={theme}>
    <ReactPlayer url={link} controls={true} width="100%"/>
    <Grid container className={classes.gridd} spacing={1} justify = "center" alignItems = "center">
      <Grid item xs>
        <Typography>{"Season "+ (Number(s)+1)+" Episode "+ (Number(e)+1)}</Typography>
      </Grid>
      <Grid item xs={3}>
    <Select
          value={link}
          onChange={handleChange}
          displayEmpty
          input={<BootstrapInput />}
        >
          {data[id].seasons[s].episodes[e].map((v,i) => {
            return <MenuItem value={v} >
              {"Link "+(i+1)}
            </MenuItem>
          })}
        </Select>
        </Grid>
        <Grid item >
        <Button  color='primary' type="button" className={classes.button}
    onClick={(e) => {
      e.preventDefault();
      window.location.href='vlc://'+link;
      }}>open in VLC</Button></Grid>
      <Grid item >
          <CopyToClipboard text={link}
          onCopy={() => setCopy('Copied!')}>
          <Button className={classes.button}>{copy}</Button>
        </CopyToClipboard>
      </Grid>
      <Grid item xs>
        {data[id].type=='series' ? <Button onClick={handleNext} className={classes.button} component={Link} to={data[id].seasons[s].episodes[Number(e)+1][0] ? "/video/"+id+"/"+s+"/"+(Number(e)+1) : "/video/"+id+"/"+(Number(s)+1)+"/0"}>Next episode</Button> : ''
        }
      
      </Grid>
      </Grid>
        </ThemeProvider>
    );
}else{return null}}

function App() {
  
  return (

    <Router>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/video/:id/:s/:e">
          <Video />
        </Route>
      </Switch>
    </Router>
    
  );
}
export default App;