import React, { Component } from 'react';
import './App.css';
import {Button} from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import PopUps from './popup';
import orange from '@material-ui/core/colors/deepOrange';
import Leaderboard from './leaderboard';
import ClickingUI from './clickingUI';
import  apiCalls from './ApiCalls';
import IntroScreen from './IntroScreen';

const theme = createMuiTheme({
  palette: {
    primary: orange
  },
  paper:
  {
    background: orange
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      userExists: false,
      points: undefined,
      password: undefined,
      cookie: undefined,
      registerPopUp: false,
      loginPopUp: false,
      gameOver: false,
      highscoreOpen: false,
      pointsClass: "default",
      pointsKey: '0',
      nextWin: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buttonIsClicked = this.buttonIsClicked.bind(this);
    this.resetPoints = this.resetPoints.bind(this);
  }

  highscores() {

    var scoreArray = [];
    var topScores = this.state.highsoreList;
    if (topScores != undefined) {
      for (var i = 0; i < topScores.length; i++) {
        scoreArray.push(<div>User: {topScores[i]["user"]} Points: {topScores[i]["score"]}</div>)
      }
      return (<div style={{ backgroundColor: "#ff5722" }}>{scoreArray}</div>);
    }

  }

  callFunctionTest(value) {
    if (value) {
      this.setState({
        name: localStorage.getItem('Username'),
        points: localStorage.getItem('Points')
      });
    }
  }

  resetPoints() {
    var data = {
      userName: localStorage.getItem('Username'),
      cookie: localStorage.getItem('Cookie'),
      points: localStorage.getItem('Points')
    }
    apiCalls.resetUser(data,this);
  }
  savetoStorage = (givenDetails) => {
    localStorage.setItem('Username', givenDetails.username);
    givenDetails.cookie === 'test' ? console.log("error handling") : localStorage.setItem('Cookie', givenDetails.cookie);
    localStorage.setItem('Points', givenDetails.points);
    if (localStorage.getItem('Points') === 0) {
      this.setState({ gameOver: true });
    }
    this.callFunctionTest(true);
  }

  callAPI() {
    var dataFound = (localStorage.getItem('Username') != null || undefined);
    dataFound = dataFound && (localStorage.getItem('Cookie') != null || undefined);
    dataFound = dataFound && (localStorage.getItem('Points') != null || undefined);
    if (dataFound) {
      var data = {
        userName: localStorage.getItem('Username'),
        cookie: localStorage.getItem('Cookie'),
        points: localStorage.getItem('Points')
      }
      let responseData = apiCalls.verifyUser(data,this);
    }
  }

  componentWillMount() {
    this.callAPI();
  }
  handleChange(event) {
    this.setState({ name: event.target.value });

  }
  buttonIsClicked() {
    var data = {
      userName: localStorage.getItem('Username'),
      cookie: localStorage.getItem('Cookie'),
      points: localStorage.getItem('Points')
    }
    apiCalls.clickButton(data,this);
  }

   handleSubmit(event) {
    var data = { "name": this.state.name };
    apiCalls.createNewUser(data,this);
  }


  handleRegistering = (props) => {
    this.setState({ registerPopUp: props.active });
    var data = {
      userName: localStorage.getItem('Username'),
      password: props.password,
      cookie: localStorage.getItem('Cookie'),
      newUserName: props.username
    }
    apiCalls.registerUser(data,this);
  }
  getLeaderboard = () => {
    apiCalls.getLeaderBoard(this);
  }
  randomKeyGeneration = () => {
    return Math.random().toString(36).slice(-8);
  }

  handleClosing = (props) => {
    if (props.type === "Register") {
      if (!props.cancel) {
        if (localStorage.getItem('Username') === null) {
          let userNameToCheck = { "username": props.username };
          apiCalls.checkIfUserIsViable(userNameToCheck,this,props);
        }
        else {
          this.handleRegistering(props);
        }
      }
      else {
        this.setState({ registerPopUp: props.active });
      }
    }
    else if (props.type === "Log In") {
      console.log("Logging in");
      if (!props.cancel) {
        var data = {
          userName: props.username,
          cookie: 'test',
          points: 20,
          password: props.password
        }
        apiCalls.logInUser(data,this);
        this.setState({ loginPopUp: props.active });
      }
      else {
        this.setState({ loginPopUp: props.active });
      }
    }
  }
  logOut = () => {
    localStorage.clear();
    this.setState({
      name: null,
      password: null,
      token: null,
      points: null
    });
    this.forceUpdate();
  }
  handlePopOut = (popout) => 
  {
    if(popout === "Log In")
    {
      this.setState({loginPopUp:true})
    }
    else
    {
      this.setState({registerPopUp:true})
    }
  }
  render() {
    const popup = [];
    const mainRender = [];


    if (this.state.registerPopUp) {
      popup.push(<PopUps
        type="Register"
        text="You Have Tried To register."
        data={this.handleClosing}
        username={this.state.name}
        active={this.state.registerPopUp}
      />);
    }
    if (this.state.loginPopUp) {
      popup.push(<PopUps
        type="Log In"
        text="You Have Tried To Log In."
        data={this.handleClosing}
        active={this.state.loginPopUp}
      />);
    }
    if (!this.state.gameOver) {
      mainRender.push(popup);
    }
    else {
      mainRender.push(<div>
        <Button onClick={this.resetPoints}>Click Here to reset points!</Button>
        <div>
          <a href="https://github.com/PastoriVasara">Oh, And also check out my github!</a>
        </div>
        <div>
          <a href="https://treegraph.kallu.fi">And my other project!</a>
        </div>
      </div>)
    }

    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <IntroScreen
          active={ !this.state.gameOver && !(this.state.name != null && this.state.points != null || (localStorage.getItem('Username') != null))} 
          userExists = {this.state.userExists}
          name = {this.state.name}
          handleChange={this.handleChange}
          handlePopOuts={this.handlePopOut}
          handleSubmit= {this.handleSubmit}
          />
          <Leaderboard
          active={ !this.state.gameOver && (this.state.name != null && this.state.points != null || (localStorage.getItem('Username') != null))}
          logOut={this.logOut}
          handlePopOuts={this.handlePopOut}/>
          <ClickingUI
          active={!this.state.gameOver && (this.state.name != null && this.state.points != null || (localStorage.getItem('Username') != null))}
          name={this.state.name}
          points={this.state.points}
          pointsClass={this.state.pointsClass}
          pointsKey={this.state.pointsKey}
          nextWin={this.state.nextWin}
          buttonIsClicked={this.buttonIsClicked}
          />
          {mainRender}
        </div>
      </MuiThemeProvider>
    );
  }
}
export default App;
