import axios from 'axios';

const ip = 'http://167.71.34.29:8000/users/';

export default {
     createNewUser(userData,bind)
    {     
        axios.post(ip+"checkIfUserExists",userData).then(userExists =>{
            if(userExists.data["user"])
            {
                bind.setState({ userExists: false });
                axios.post(ip+"createUser",userData).then(creatingUser =>
                    {                       
                        bind.savetoStorage(creatingUser.data);
                    })
            }
            else
            {
                bind.setState({ userExists: false });
            }
        })
    },
    registerUser(data,bind)
    {      
        axios.post(ip + 'registerUser',data).then(registered => 
            {
                localStorage.setItem('Registered', true);
                bind.savetoStorage(registered.data);
            }); 
    },
    getLeaderBoard(bind)
    {
        axios.get(ip+'leaderboard').then(leaderboard => {
            bind.setState({ highsoreList: leaderboard.data, highscoreOpen: true });
        })
    },
    checkIfUserIsViable(data,bind,props)
    {
        axios.post(ip+'checkIfUserExists').then(userExists => {
            if(userExists.data["user"])
            {
                bind.handleRegistering(props);
            }
        })
    },
    logInUser(data,bind)
    {
        axios.post(ip+'checkUser',data).then(userExists => 
            {
                if(userExists.data["data"] == null)
                {
                    localStorage.setItem('Registered', true);
                    bind.savetoStorage(userExists.data);
                }
                else
                {
                    alert("Log in Failed!");
                }
            })
    },
    clickButton(data,bind)
    {
        axios.post(ip+'buttonClicked',data).then(clickAccepted => 
            {
                clickAccepted.data["reward"] > 0 ?
                bind.setState({ pointsClass: "correctAnimation", pointsKey: "" + bind.randomKeyGeneration() }) :
                bind.setState({ pointsClass: "incorrectAnimation", pointsKey: "" + bind.randomKeyGeneration() })
                bind.setState({ nextWin: clickAccepted.data["clicksUntilWin"] });
                bind.savetoStorage(clickAccepted.data);
            })
    },
    verifyUser(data,bind)
    {
        axios.post(ip+'checkUser',data).then(userVerified => 
            {
                if (userVerified.data["data"] == null) {
                    bind.savetoStorage(userVerified.data);
                }
            })
    },
    resetUser(data,bind)
    {
        axios.post(ip+'resetPoints',data).then(clickAccepted => {
            bind.savetoStorage(clickAccepted.data);
            bind.setState({
                gameOver: false
              });
        });
    }
}