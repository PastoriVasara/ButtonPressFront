import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


class popup extends Component {
    constructor(props){
    super(props);
    this.state =
        {
            type: this.props.type,
            text: this.props.text,
            active: true,
            username: this.props.username === undefined ? '' : this.props.username,
            password: '',
            data: {}
        };
        this.handleChange = this.handleChange.bind(this);
    }
   
    componentWillMount() {
    }
    componentDidUpdate(previousProperties,properties)
    {
        if( properties.active !== this.state.active)
        {
            this.setState({active: properties.active});
        }
    }
    handleClosing  = (value) =>
    {
        this.props.data({
            active : false, 
            type: this.state.type, 
            username: this.state.username, 
            password: this.state.password,
            cancel: value
        });
    }
    handleChange = (event) => 
    {
        this.setState({[event.target.id]: event.target.value})
    }

    render() {
        return (
            <div>
                <Dialog open={this.state.active}>
                    <DialogTitle id="form-dialog-title">{this.state.type}</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="username"
                            label="Username"
                            value= {this.state.username}
                            type="username"
                            fullWidth
                            onChange={this.handleChange}
                        />
                        <TextField                            
                            margin="dense"
                            id="password"
                            label="Password"
                            value= {this.state.password}
                            type="password"
                            fullWidth
                            onChange={this.handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button id="cancel"onClick={(e,v) => {this.handleClosing(true)}} color="primary">
                            Cancel
                        </Button>
                        <Button id="accept"onClick={(e,v) => {this.handleClosing(false)}} color="primary">
                            {this.state.type}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
export default popup;