import {Component} from 'react';
import Login from './Login'
import Register from './Register'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
class App extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = { apiResponse: "" };
  // }

  // callAPI() {
  //     fetch("http://localhost:9000/testAPI")
  //         .then(res => res.text())
  //         .then(res => this.setState({ apiResponse: res }));
  // }

  // componentWillMount() {
  //     this.callAPI();
  // }

  render(){
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
