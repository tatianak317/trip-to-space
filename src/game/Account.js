import { Component } from "react";
import "./Account.css";
import Login from './Login'

class Account extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
        };
        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  
    }
  componentDidMount() {
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
    post() {
        fetch(`${process.env.REACT_APP_API_URL}/createAccount`, {
        method: 'POST',
        body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        }),
        headers: {
         'Content-Type': 'application/json; charset=UTF-8',
        },
        })
          // error handling like in login
          .then((response) => {
            // this.props.update(this.state.username)
            return response.json()
          })
      
    }

  render() {
    if (this.props.username) {
      return (<div className="accountPageContainer">
        <p className="title">{this.props.username}</p>
        <button className="submit">Dark Mode</button>
        <button className="submit" onClick={() => this.props.logout()}>Logout</button>
        </div>)
    } else {
      return (
      <div className="page">
      <form autoComplete="on" className="loginScreenInitial" onSubmit={this.handleSubmit}>
        <p>Create Account</p>
        <label>
          Username 
          <input className="fields" type="text" value={this.state.username} onChange={this.handleChangeUser} />
            </label>
            <label>
          Password 
          <input className="fields" type="password" value={this.state.password} onChange={this.handleChangePass} />
        </label>
        <div className="submitAccount">
            <input className="font" id="submit"type="submit" value="Submit" />
          </div>
        </form>
        </div>
    );
    }
    
  }
}
export default Account