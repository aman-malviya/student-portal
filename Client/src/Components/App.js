import {Component} from 'react';
import Auth from './Auth'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Profile from './Profile';
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
            <Route path="/" exact component={Profile} />
            <Route path="/auth" component={Auth} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
