///////////////
// DEPENDENCY
///////////////
import React, { Component } from 'react'
import OrderList from './components/OrderList';
import ShowList from './components/ShowList';
import Form from './components/Form';
import Nav from './components/Nav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// ===================
// COMPONENT
// ===================
class App extends Component {
  render() {
    return (
      <Router>
      <Nav />
      <div>
        <Switch>
        <Route path="/" exact component={ShowList} />
        <Route path="/order" component={OrderList} />
        <Route path="/form" component={Form}       />
        </Switch>
      </div>
      </Router>
    );
  }
}



// ===================
// EXPORT
// ===================
export default App;
