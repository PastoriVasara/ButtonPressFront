import React, { Component } from 'react';
import  {Button} from "@material-ui/core";

class clickingUI extends Component {
    render()
    {
        const ClickingUI = [];
        if(this.props.active)
        {
            ClickingUI.push(<div  key="ClickingParent" style={{ marginTop: "12.5vh", fontSize: "48px", color: "white", fontFamily: "Roboto" }}>
            <div className="pointText"><div>{this.props.name} You have</div>
              <div key={this.props.pointsKey} className={this.props.pointsClass}>{this.props.points}</div>
              <div>Points!</div></div>
            <div style={{ marginTop: "12.5vh" }}>
              <Button style={{ fontSize: "128px", color: "white" }} onClick={this.props.buttonIsClicked}>Try Your Luck!</Button>
            </div>
            {this.props.nextWin !== 0 ? <div>Next win is in {this.props.nextWin} clicks</div> : null}
          </div>);
        }
        return(
            <>
            {ClickingUI}
            </>
            )
    }
}
export default clickingUI;