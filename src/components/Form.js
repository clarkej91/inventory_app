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
      this.props.handleCreateProduct(this.state)
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
      let redirectTo = '/home';
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
