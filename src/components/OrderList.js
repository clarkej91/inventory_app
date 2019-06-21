import React, { Component } from 'react'


// ===================
// COMPONENT
// ===================
class OrderList extends Component {
  render() {
    console.log('this is in ordlist', this.props.filterArray);
    return (
      <div>
      <ul>
        <h1> Order Page</h1>
        {this.props.filterArray ? this.props.filterArray.map((product, index) => {
          return(
            <li key={index}>
              <h2>Product</h2>{product.product_name}
              <h4>Price</h4>{product.price}
              <h5>Quantity</h5>{product.qty}
              <div>
              <button
              onClick={() => { this.props.handleAdd(product)}}
              >+</button>
              <button
              onClick={() => { this.props.handleSubtract(product)}}
              >-</button>
              </div>
              <div>
              <button
              onClick={() => { this.props.removeFilterArray(product.id, index, this.props.filter)}}
              >BACK IN STOCK</button>
              </div>
            </li>
          )
        }): ''}
      </ul>
      </div>
    );
  }
}

// ===================
// EXPORT
// ===================
export default OrderList;
