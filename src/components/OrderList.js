import React, { Component } from 'react'


// ===================
// COMPONENT
// ===================
class OrderList extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.filterArray ? this.props.filterArray.map((products, index) => {
          console.log(products);
          return (
            <h1
            key={index}
            >{products.product_name}</h1>
          )
        }
      ): ''
    }
      </div>
    );
  }
}

// ===================
// EXPORT
// ===================
export default OrderList;
