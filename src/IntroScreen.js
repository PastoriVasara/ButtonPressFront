import React, { Component } from 'react';
import { TextField, Button } from "@material-ui/core";
import ForwardIcon from '@material-ui/icons/Forward';
import './App.css';

class IntroScreen extends Component {
    render() {
        const IntroScreenContent = [];
        if (this.props.active) {
            IntroScreenContent.push(<div key="animationParent" className="introAnimation">
                <div className="largeText">What is your name?</div>
                <div key="animationContainer" className="delayedAnimation">
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

                        <TextField
                            key="NameChangeField"
                            value={this.props.name}
                            type="username"
                            error={this.props.userExists}
                            helperText={this.props.userExists ? "User Already Exists." : ""}
                            inputProps={{
                                style: { fontSize: 120, color: "white", borderBottom: "none" }
                            }}
                            onChange={this.props.handleChange}
                        />
                        <ForwardIcon onClick={this.props.handleSubmit} className="svg_icons" />
                    </div>

                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}> Already user?
            <Button onClick={(e, v) => { this.props.handlePopOuts("Log In") }}>Log In</Button></div>
                </div>
            </div>);
        }
        return (
            <>
                {IntroScreenContent}
            </>
        )
    }
}
export default IntroScreen;