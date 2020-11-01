import React, { Component } from 'react';
import { Box, Container } from '@material-ui/core';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import { withStyles } from '@material-ui/styles';

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

class CategoriesListView extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Page title="Categories" className={classes.root}>
        <Container maxWidth={false}>
          <Toolbar />
          <Box mt={3}>
            adsadsfaf
          </Box>
        </Container>
      </Page>
    );
  }
};

export default (withStyles(styles)(CategoriesListView));
