import React, { Component } from 'react'
import OrderList from './OrderList';

// ===================
// COMPONENT
// ===================
class ShowList extends Component {
  constructor(props) {
  super(props)
  this.state = {
    inventory: [],
    filterArray: [],
    filter: 'inventory'

  }
  this.setProducts = this.setProducts.bind(this)
  this.sortProducts = this.sortProducts.bind(this)
  this.fetchProducts = this.fetchProducts.bind(this)
  this.handleAdd = this.handleAdd.bind(this)
  this.handleSubtract = this.handleSubtract.bind(this)
  this.handleDelete = this.handleDelete.bind(this)
  this.removeFromArray = this.removeFromArray.bind(this)
  this.setFilter = this.setFilter.bind(this)
}
///////////////
// METHODS
///////////////
  fetchProducts () {
    fetch('http://localhost:3000/products')
    .then(data => data.json())
    .then( jData => {
      console.log('this is jData', jData)
      this.sortProducts(jData)
    })
  }
  sortProducts(products) {
    let inventory = []
    products.forEach( product => {
      inventory.push(product)
    })
    this.setProducts(inventory)
  }
  setProducts(created) {
    this.setState({
      inventory: created
    })
  }

  handleAdd(product){
    (product.qty = parseInt(product.qty) + 1)
    console.log('inside handleAdd',product.qty);
    fetch(`http://localhost:3000/products/${product.id}`, {
      body:JSON.stringify(product),
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then( updatedQty => updatedQty.json())
    .then(jData => {
    })
    .catch(err => console.log('this is error from handleAdd', err))
    this.fetchProducts()
  }

  setFilter(created){
    this.setState({
      filterArray: created
    })
    console.log('this is filterArray', this.state.filterArray);
  }

  handleSubtract(product){
    (product.qty = parseInt(product.qty) - 1)
    if(product.qty <= product.low_stock_value){
      let filterArray = []
        filterArray.push(product)
        this.setFilter(filterArray)
    }
    fetch(`http://localhost:3000/products/${product.id}`, {
      body:JSON.stringify(product),
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then( updatedQty => updatedQty.json())
    .then(jData => {
    })
    .catch(err => console.log('this is error from handleSubtract', err))
    this.fetchProducts()
  }

  handleDelete(productId, index, currentArray){
    console.log('inside handleDelete', productId, index, currentArray);
    fetch(`http://localhost:3000/products/${productId}`, {
      method: 'DELETE'
    })
    .then(data => {
      this.removeFromArray(currentArray, index)
    }).catch( err => console.log('this is error from handleDelete', err))
  }

  removeFromArray(array, arrayIndex){
    this.setState(prevState => {
      prevState[array].splice(arrayIndex, 1)
      return {
        [array]: prevState[array]
      }
    })
  }

  componentDidMount() {
    this.fetchProducts()
  }
  render() {
    return (
      <ul>
        <h1> Show All Page </h1>
        {console.log(this.state)}
        <OrderList
          filterArray={this.state.filterArray}
        />
        {this.state.inventory.map((product, index) => {
          return(
            <li key={index}>
              <h2>Product</h2>{product.product_name}
              <h4>Price</h4>{product.price}
              <h5>Quantity</h5>{product.qty}
              <div>
              <button
              onClick={() => { this.handleAdd(product)}}
              >+</button>
              <button
              onClick={() => { this.handleSubtract(product)}}
              >-</button>
              </div>
              <div>
              <button
              onClick={() => { this.handleDelete(product.id, index, this.state.filter)}}
              >DELETE</button>
              </div>
            </li>
          )
        })}
      </ul>
    );
  }
}

// ===================
// EXPORT
// ===================
export default ShowList;
