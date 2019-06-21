import React, { Component } from 'react'
import NumberFormat from 'react-number-format';


// ===================
// COMPONENT
// ===================
class ShowList extends Component {
  render() {
    return (
      <div className="list-Container">
      <div className="header">
        <h1> In Stock </h1>
      </div>
        <div className="products">
        {this.props.inventory.map((product, index) => {
          return(
            <div  key={index}
            >
              <h2>{`Product: ${product.product_name}`}</h2> <h2>Price:
              <NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} />
              </h2>
              <h2>{`Quantity: ${product.qty}`}</h2>
              <div>
              <span>
              <button
              className="addSubBtn"
              onClick={() => { this.props.handleAdd(product)}}
              >+</button>
              <button
              className="addSubBtn"
              onClick={() => { this.props.handleSubtract(product)}}
              >-</button>
              </span>
              </div>
              <div>
              <button
              className="deleteBtn"
              onClick={() => {
          if (window.confirm('Are you sure you wish to delete this item?'))
                this.props.handleDelete(product.id, index, this.props.filter)}}
              >DELETE</button>
              </div>
              </div>
          )
        })}
      </div>
      </div>
    );
  }
}

// ===================
// EXPORT
// ===================
export default ShowList;
