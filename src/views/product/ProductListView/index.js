import React, { Component } from 'react';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { withStyles } from '@material-ui/styles';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import ProductCard from './ProductCard';

import { connect } from 'react-redux';
import { productsFetchData, addProducts } from '../../../redux/_actions/actions-products';
import { categoriesFetchData } from '../../../redux/_actions/action-categories';

const styles = theme => {
  return ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
    },
    productCard: {
      height: '100%'
    }
  });
};

const mapStateToProps = state => {
  return { 
    products: state.products
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      fetchData: (url) => dispatch(productsFetchData(url)),
      catFetchDate: (url) => dispatch(categoriesFetchData(url)),
      addProducts: (url, product) => dispatch(addProducts(url, product)),
  };
};

class ProductList extends Component {

  componentWillMount() {
    this.props.fetchData('https://snscz-api.herokuapp.com/products');
    this.props.catFetchDate('https://snscz-api.herokuapp.com/category');
  }

  render() {
    const { classes } = this.props;
    return (
      <Page title="Products"  className={classes.root}>
        <Container>
          <Toolbar/>
          <Box mt={3}>
            <Grid container spacing={3}>
              {this.props.products.map((product) => (
                <Grid item key={product.product.id} lg={3} md={6} xs={12}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box mt={3} mb={3} display="flex" justifyContent="center">
            <Pagination color="primary" count={3} size="small" />
          </Box>
        </Container>
      </Page>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProductList));
