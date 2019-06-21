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
  constructor(props) {
  super(props)
  this.state = {
    inventory: [],
    filterArray: [],
    filter: 'inventory'
  }
    this.fetchProducts = this.fetchProducts.bind(this)
    this.sortProducts = this.sortProducts.bind(this)
    this.setProducts = this.setProducts.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleSubtract = this.handleSubtract.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.removeFromArray = this.removeFromArray.bind(this)
    this.removeFilterArray = this.removeFilterArray.bind(this)
    this.handleNumCheck = this.handleNumCheck.bind(this)
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
      this.fetchProducts()
    })
    .catch(err => console.log('create list error: ', err));
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
      console.log(jData);
    })
    .catch(err => console.log('this is error from handleAdd', err))
    this.fetchProducts()
  }

  handleNumCheck(product){
    if(product.qty === 0){
      this.fetchProducts()
      console.log('this is in handleNumCheck', product);
    }
  }

  handleSubtract(product){
    (product.qty = parseInt(product.qty) - 1)
    if(product.qty <= product.low_stock_value){
      let filterArray = []
        filterArray.push(product)
        this.setFilter(filterArray)
        this.handleNumCheck(product)
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

  setFilter(created){
    this.setState({
      filterArray: created
    })
    console.log('this is filterArray', this.state.filterArray);
  }

  sortProducts(products) {
    let inventory = []
    let orderArray = []
    products.forEach( product => {
      if(product.qty <= product.low_stock_value){
        console.log('this is in sortProducts if statement', product.qty)
        orderArray.push(product)
      } else {
        inventory.push(product)
      }
    })
    this.setProducts(inventory, orderArray)
  }

  setProducts(createdInventory, createdOrderArray) {
    this.setState({
      inventory: createdInventory,
      filterArray: createdOrderArray
    })
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

  fetchProducts () {
    fetch('http://localhost:3000/products')
    .then(data => data.json())
    .then( jData => {
      console.log('this is jData', jData)
      this.sortProducts(jData)
    })
  }

  removeFilterArray() {
    this.setState({
      filterArray: ''
    })
  }

  componentDidMount() {
    this.fetchProducts()
  }

  render() {
    return (
      <Router>
      <Nav />
      <div>
        <Switch>
        <Route path="/home"
          render={(routeProps) => (<ShowList
          {...routeProps}
          inventory={this.state.inventory}
          filterArray={this.state.filterArray}
          filter={this.state.filter}
          handleAdd={this.handleAdd}
          handleSubtract={this.handleSubtract}
          handleDelete={this.handleDelete}
          />)}/>
        <Route path="/order"
          render={(routeProps) => (<OrderList {...routeProps} inventory={this.state.inventory}
          filterArray={this.state.filterArray}
          filter={this.state.filter}
          handleAdd={this.handleAdd}
          handleSubtract={this.handleSubtract}
          handleDelete={this.handleDelete}
          removeFilterArray={this.removeFilterArray}
            />)} />
        <Route path="/form"
        render={(routeProps) => (<Form
          {...routeProps}
          handleCreateProduct={this.handleCreateProduct}
          />)} />
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
