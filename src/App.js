import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch ,Redirect} from 'react-router-dom';
import './App.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import PolicySearchDashboard from "./PolicySearch/components/PolicySearchDashboard";
import PolicyGraph from "./PolicySearch/components/PolicyGraph";
import Navbar from "./common/NavBar";

/**
 * Responsible for routing on the entire application
 * Initiall when app loads takes to the /home url
 * which opens Policy Search screen
 * 
 * All the css and bootstrap files are imported here
 */
class App extends Component {

  render() {
    return (
      <>
        <Router>
          <Fragment>
            <Navbar/>
            <Switch>
              <Route exact path='/home' component={PolicySearchDashboard} />
              <Route exact path='/policygraph' component={PolicyGraph} />
              <Route exact path='/**' render={()=><Redirect to="/home"/>} />
            </Switch>
          </Fragment>
        </Router>
      </>
    );
  }
}

export default App;