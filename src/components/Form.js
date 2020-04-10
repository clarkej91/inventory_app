import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


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
      this.handleRedirect()
      this.clearForm()
    }

    handleRedirect = () => {
      this.setState({
        redirect: true
      })
      if (this.state.redirect === true) {
        let redirectTo = '/home';
        return <Redirect to={redirectTo} />
      }
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
      <Card>
        <CardContent>
        <Typography color="textSecondary" gutterBottom>
      <h1> Add New Item </h1>
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <TextField
            id="product_name"
            label="Product Name"
            variant="outlined"
            onChange={this.handleChange}
            value={this.state.product_name}
          />
          <TextField
            id="qty"
            label="Quantity"
            variant="outlined"
            onChange={this.handleChange}
            value={this.state.qty}
          />
          <TextField
            id="low_stock_value"
            label="Low Stock Value"
            variant="outlined"
            onChange={this.handleChange}
            value={this.state.low_stock_value}
          />
          <TextField
            id="price"
            label="Price"
            variant="outlined"
            onChange={this.handleChange}
            value={this.state.price}
          />
          <CardActions>
          <Button
            variant="contained"
            className="formBtn"
            type="submit">
            Submit New Item
          </Button>
          </CardActions>
        </form>
        </CardContent>
      </Card>
      </div>
    );
  }
}

// ===================
// EXPORT
// ===================
export default Form;
