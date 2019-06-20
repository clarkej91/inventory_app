import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';


// ===================
// COMPONENT
// ===================
class Form extends Component {
  constructor(props) {
  super(props)
    this.state = {
      product_name: '',
      qty: '',
      stock_value: '',
      low_stock_value: '',
      price: '',
      redirect: false,
      createdProductID: null
    }
    this.handleCreateProduct = this.handleCreateProduct.bind(this)
}

  handleCreateProduct(product) {
    fetch('http://localhost:3000/products', {
      body: JSON.stringify(product),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then( createdProduct => createdProduct.json())
    .then( jData => {
      this.setState({
        redirect: true,
        createdProductID: jData.id
      }, console.log(jData))
    })
    .catch(err => console.log('create list error: ', err));
  }
  ///////////////
// HANDLERS
///////////////

    handleChange = (event) => {
      this.setState({
        [event.target.id]: event.target.value
      })
    }

    handleSubmit = (event) => {
      event.preventDefault()
      this.handleCreateProduct(this.state)
      this.clearForm()
    }

    clearForm = () => {
      this.setState({
        product_name: '',
        qty: '',
        stock_value: '',
        low_stock_value: '',
        price: ''
      })
    }

///////////////
// RENDER
///////////////
  render() {
    if (this.state.redirect === true) {
      let redirectTo = '/';
      return <Redirect to={redirectTo} />
    }
    return (
      <div>
      <h1> Show Form Page </h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="product name"
            onChange={this.handleChange}
            value={this.state.product_name}
            id="product_name"
          />
          <input
            type="number"
            placeholder="quantity"
            onChange={this.handleChange}
            value={this.state.qty}
            id="qty"
          />
          <input
            type="number"
            placeholder="low stock value"
            onChange={this.handleChange}
            value={this.state.low_stock_value}
            id="low_stock_value"
          />
          <input
            type="number"
            placeholder="price"
            onChange={this.handleChange}
            value={this.state.price}
            id="price"
          />
          <button
            type="submit">
            Submit New Item
          </button>

        </form>
      </div>
    );
  }
}

// ===================
// EXPORT
// ===================
export default Form;
