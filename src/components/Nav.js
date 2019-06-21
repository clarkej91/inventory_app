import React, { Component } from 'react';
import {Link} from 'react-router-dom';


// ===================
// COMPONENT
// ===================
class Nav extends Component {
  render() {
    return (
       <nav>
        <Link to="/home">
          <li>Home</li>
        </Link>
        <Link to="/order">
          <li>Order</li>
        </Link>
        <Link to="/form">
          <li>Add Item</li>
        </Link>
       </nav>
    );
  }
}

// ===================
// EXPORT
// ===================
export default Nav;
