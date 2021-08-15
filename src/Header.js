import { Component } from "react";
import Asteroid from './Asteroid';
import Game from './game/Game'; 
import Account from './game/Account';
import Login from './game/Login';
import Home from './Home';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Header extends Component {
  constructor(props) {
        super(props)
    this.state = {
      username: "",
    };
    this.updateState = this.updateState.bind(this);
    this.logout= this.logout.bind(this);
    }
  componentDidMount() {
    if (localStorage.getItem("Username")) {
      this.setState({username: localStorage.getItem("Username")})
    }

  }
  updateState(username) {
    localStorage.setItem("Username", username)
    this.setState({ username: username })
  }

  logout() {
    localStorage.clear("Username")
    this.setState({ username: "" })
  }
  render() {
    return (<div className="header"> 
      <Router>
            <div className="links">
            <div className="title">NASA STUFF (not affiliated)</div>
            <Link to="/">Home</Link>
            <Link to="/asteroid">Asteroid</Link>
          <Link to="/game">Game</Link>
          <Link to='/account'>{this.state.username ? this.state.username : "Create Account" }</Link>
        </div>
      <Switch>
          <Route exact path="/">
            {this.state.username ? <Home /> : <Login update={this.updateState} username={this.state.username}/>}
          </Route>
          <Route path="/asteroid">
            <Asteroid />
        </Route>
        <Route path="/game"> 
            <Game />
          </Route>
          <Route exact path="/account">
            <Account update={this.updateState} username={this.state.username} logout={ this.logout}/>
          </Route>
        </Switch>
      </Router>
    </div>)
    }
}
    
export default Header