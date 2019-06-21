import React, { Component } from 'react';
import NumberFormat from 'react-number-format';


// ===================
// COMPONENT
// ===================
class OrderList extends Component {
  render() {
    return (
      <div className="list-Container">
      <div className="header">
        <h1> Low Stock </h1>
      </div>
      <div className="products">
        {this.props.filterArray ? this.props.filterArray.map((product, index) => {
          return(
            <div

            key={index}>
              <h2>{`Product ${product.product_name}`}</h2>
              <h2>Price:
              <NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} />
              </h2>
              <h2>{`${product.qty} LEFT IN STOCK`}
              </h2>
              <div>
              <button
              className="addSubBtn"
              onClick={() => { this.props.handleAdd(product)}}
              >+</button>
              <button
              className="addSubBtn"
              onClick={() => { this.props.handleSubtract(product)}}
              >-</button>
              </div>
              <div>
              <h3>Plus to put back in stock</h3>
              </div>
            </div>
          )
        }): ''}
      </div>
      </div>
    );
  }
}

// ===================
// EXPORT
// ===================
export default OrderList;
