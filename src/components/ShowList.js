import React, { Component } from 'react'
import NumberFormat from 'react-number-format';


// ===================
// COMPONENT
// ===================
class ShowList extends Component {
  render() {
    return (
      <div>
      <ul>
        <h1> Show Page </h1>
        {this.props.inventory.map((product, index) => {
          return(
            <li key={index}>
              <h2>Product</h2>{product.product_name}
              <h4>Price</h4>
              <NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} />
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
              onClick={() => { this.props.handleDelete(product.id, index, this.props.filter)}}
              >DELETE</button>
              </div>
            </li>
          )
        })}
      </ul>
      </div>
    );
  }
}

// ===================
// EXPORT
// ===================
export default ShowList;
