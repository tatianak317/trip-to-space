import { Component } from "react";
import "./Account.css";
import Account from './Account'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            hasError: false,
            loggedin: false,
        };
        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


  handleChangeUser(event) {
      this.setState({ username: event.target.value });
  }
    handleChangePass(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.post()
  }
    async post() {
        console.log("env", process.env)
        const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
           },
            
       })
           
           .then((response) => { 
               return (response)
    })

        if (response.ok) {
            this.setState({ hasError: false });
            this.setState({ loggedin: true });
            const responseParsed = await response.json()
            if (responseParsed.username) {
                this.storeUser(responseParsed.username)
                this.props.update(this.state.username)
            }
            if (responseParsed.highScore) {
                localStorage.setItem("high score", responseParsed.highScore)
            }
        } else {
            this.setState({ hasError: true });
            this.setState({ loggedin: false });
        }
    }
    storeUser(response) {
        localStorage.setItem("Username", response)
    }
    logout() {
        localStorage.clear("Username")
        this.setState({ loggedin: false });
    }
    //seperate into own function and call in render
    render() {
       if (this.state.hasError === true && this.state.loggedin === false) {
            return (<h1>Something went wrong.</h1>)
       } else if((this.state.hasError === false && this.state.loggedin === true)  || this.props.username) {
           return (<div>
               <p>Logged in</p>
                <button className="submit"onClick={() => this.logout()}>Logout</button> 
            </div>)
       } else if(this.state.hasError === false && this.state.loggedin === false) {
           return (
               <div className="page">
      <form autoComplete="on" className="loginScreenInitial" onSubmit={this.handleSubmit}>
        <p>Account Login</p>
        <label>
          Username      
          <input className="fields" type="text" value={this.state.username} onChange={this.handleChangeUser} />
            </label>
            <label>
          Password     
          <input className="fields" type="password" value={this.state.password} onChange={this.handleChangePass} />
        </label>
                       <input className="font" id="submit" type="submit" value="Submit" />
                       <a href="/Account">Don't have an account? Create one here.</a>
        </form>
        </div>
    ); 
    }

  }
}
export default Login