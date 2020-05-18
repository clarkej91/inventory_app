import React, { Component } from 'react'
import OrderList from './components/OrderList';
import ShowList from './components/ShowList';
import Form from './components/Form';
import Nav from './components/Nav';
import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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
    this.handleSearch = this.handleSearch.bind(this)
}
  handleCreateProduct(product) {
    fetch('https://obscure-brushlands-30090.herokuapp.com/products', {
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
    fetch(`https://obscure-brushlands-30090.herokuapp.com/products/${product.id}`, {
      body:JSON.stringify(product),
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then( updatedQty => updatedQty.json())
    .then(jData => {
      this.fetchProducts()
    })
    .catch(err => console.log('this is error from handleAdd', err))
  }

  handleNumCheck(product){
    if(product.qty === 0){
      this.fetchProducts()
    }
  }

  handleSubtract(product){
    (product.qty = parseInt(product.qty) - 1)
    if(product.qty <= product.low_stock_value){
      alert(`${product.product_name} is low in stock`)
      let filterArray = []
        filterArray.push(product)
        this.setFilter(filterArray)
        this.handleNumCheck(product)
    }

  fetch(`https://obscure-brushlands-30090.herokuapp.com/products/${product.id}`, {
    body:JSON.stringify(product),
    method: 'PUT',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  })
  .then( updatedQty => updatedQty.json())
  .then(jData => {
      this.fetchProducts()
  })
  .catch(err => console.log('this is error from handleSubtract', err))
}

  setFilter(created){
    this.setState({
      filterArray: created
    })

  }

  sortProducts(products) {
    let inventory = []
    let orderArray = []
    products.forEach( product => {
      if(parseInt(product.qty) <= parseInt(product.low_stock_value)){
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
    fetch(`https://obscure-brushlands-30090.herokuapp.com/products/${productId}`, {
      method: 'DELETE'
    })
    .then(data => {
      this.removeFromArray(currentArray, index)
    }).catch( err => console.log('this is error from handleDelete', err))
  }

  handleSearch(productName){
    if(productName.search === ''){
      this.fetchProducts()
    } else {
    fetch(`https://obscure-brushlands-30090.herokuapp.com/products/search=${productName.search}`, {
      method: 'GET'
    })
    .then(data => data.json())
    .then( jData => {
      this.sortProducts(jData)
    })
  }
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
    fetch('https://obscure-brushlands-30090.herokuapp.com/products')
    .then(data => data.json())
    .then( jData => {
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
      <div className="root">
      <Toolbar>
      </Toolbar>
      <Router>
      <Nav
        handleSearch={this.handleSearch}
      />
      <div className="drawer">
      <div className="drawerHeader">
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
      </div>
      </Router>
      </div>
    );
  }
}
export default App;
