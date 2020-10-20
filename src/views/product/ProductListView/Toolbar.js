import React, {Component} from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { connect } from 'react-redux';
import { modalHasChanged } from "../../../redux/_actions/action-modal";
import Modal from './Modal';

const mapStateToProps = (state) => {
  return { 
    modal: state.modalHasChanged,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      changeModal: (data) => dispatch(modalHasChanged(data))
  };
};

class Toolbar extends Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.changeModal(true);
  }

  _showMessage = (bool) => {
    
    console.log('SUKA!!!');
  }

  render() {
    return (
      <div>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button color="primary" variant="contained" onClick={this.handleClick}>
            Добавить продукт
          </Button>
        </Box>
        <Box mt={2}>
          <Card>
            <CardContent>
              <Box maxWidth="100%">
                <TextField fullWidth InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )}} placeholder="Найти продукт" variant="outlined" />
              </Box>
            </CardContent>
          </Card>
          {this.props.modal && <Modal />}
        </Box>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
