import React, { Component } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, Button, Toolbar, Drawer, IconButton } from "@material-ui/core";
import apiCalls from './ApiCalls';

class leaderboard extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            visible: this.props.active,
            highscoreOpen: false,
            highscoreList: null
        };

    }

    getLeaderboard = () => {
        apiCalls.getLeaderBoard(this);
    }
    highscores() {

        var scoreArray = [];
        var topScores = this.state.highsoreList;
        if (topScores !== undefined) {
            for (var i = 0; i < topScores.length; i++) {
                scoreArray.push(<div style={{  borderBottom: "0.5px solid rgba(255, 255, 255, .5)",fontWeight:"bold",fontSize:"18px",margin:"10px",color:"white"}} key={i+"_key"}><div style={{display:"flex",alignItems:"center"}}><div style={{fontSize: "32px",marginRight:"25px"}}>{topScores[i]["user"]}</div> <div>{topScores[i]["score"]} Points</div></div></div>)
            }
            return (<div style={{ backgroundColor: "#ff5722", height:"100%" }}>{scoreArray}</div>);
        }

    }

    render() {
        const appBar = [];
        if(this.props.active)
        {
            appBar.push(  <div key="appBarParent">
            <AppBar position="static">
                <Toolbar>
                    <IconButton onClick={(e, v) => { this.getLeaderboard() }} edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <div style={{ marginLeft: "auto", marginRight: "0" }}>
                        {
                            localStorage.getItem('Registered') === "true" ?
                                <><Button onClick={(e, v) => { this.props.logOut() }}>Log Out</Button> </> :
                                <><Button onClick={(e, v) => { this.props.handlePopOuts("Log In") }}>Log In</Button>
                                    <Button onClick={(e, v) => { this.props.handlePopOuts("Register") }}>Register</Button></>
                        }

                    </div>
                </Toolbar>
            </AppBar>
            <Drawer open={this.state.highscoreOpen} onClose={(e, v) => { this.setState({ highscoreOpen: false }) }}>
                {this.highscores()}
            </Drawer>
        </div>)
        }

        return (
            <div>
            {this.props.active}
            {appBar}
            </div>
        )
    }
}
export default leaderboard;