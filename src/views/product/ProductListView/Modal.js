import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Container,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Grid,
  Button
} from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { DropzoneArea } from 'material-ui-dropzone';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

import { connect } from 'react-redux';
import { modalHasChanged } from '../../../redux/_actions/action-modal';
import { categories } from '../../../redux/_actions/action-categories';
//import { products } from 'src/redux/_reducers/reducer-products';

const mapStateToProps = (state) => ({
    modal: state.modalHasChanged,
    categories: state.categories
  });
  
  const mapDispatchToProps = dispatch =>({
    changeModal: modalData => dispatch(modalHasChanged(modalData)),
  });

const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);
  
  class Modal extends Component {
    constructor() {
        super();

        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            productName: '',
            volume: '',
            productCode: '',
            price: '',
            volumeType: 0,
            file: null,
            imageid: 0,
            categoryName: ''
          };
    }

    handleChangeImage = (files) => {
        this.setState({
          file: files
        });
        
        if(files.length !== 0) {
          const url = 'https://snscz-api.herokuapp.com/images';
          const formData = new FormData();
          formData.append('file',files[0]);
          const config = {headers: { 'content-type': 'multipart/form-data' }}
          
        axios.post(url, formData, config)
        .then((response) => {
            this.setState({ imageid: response.data.id });
            NotificationManager.success('Фото успешно загружено!', 'Успех!', 3000);
          })
        .catch((error)=>{
            console.log(error);
         });
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value })
    }

    handleSubmit() {
        const product = JSON.stringify({
            ProductName: this.state.productName,
            Volume: parseFloat(this.state.volume),
            ProductCode: this.state.productCode,
            Price: parseFloat(this.state.price.replace(",", ".")),
            VolumeTypeId: this.state.volumeType,
            ImageId: parseFloat(this.state.imageid),
        });
        console.log(product);
        axios.post(`https://snscz-api.herokuapp.com/products`, product, {
            headers: { "Content-Type": "application/json" }
            }).then((response) => {
                NotificationManager.success('Вы успешно добавили продукт!', 'Успех!', 3000);
                console.log(response);
            }, (error) => {
                NotificationManager.error('Ошибка при сохранении позиции! ' + error, 'Ошибка!');
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error);
        });
        this.props.changeModal(!this.props.modal);
    }

    toggle() {
      this.props.changeModal(!this.props.modal);
    }

    render() {
      console.log('products is: ', this.props.categories);
        return (
            <div>
              <Dialog onClose={this.toggle} aria-labelledby="customized-dialog-title" open={this.props.modal}>
                <DialogContent dividers>
                <Box
                    display="flex"
                    flexDirection="column"
                    height="100%"
                    justifyContent="center"
                    >
                    <Container maxWidth="sm">
                        <Formik
                        validationSchema={
                            Yup.object().shape({
                            productName: Yup.string().max(255).required('Заполнить!'),
                            volume: Yup.string().max(255).required('Заполнить!'),
                            productCode: Yup.string().max(255).required('Заполнить!'),
                            price: Yup.string().max(255).required('Заполнить!'),
                            })
                        }
                        >
                        {({
                            errors,
                            touched,
                            values
                        }) => (
                            <form onSubmit={this.handleSubmit}>
                            <TextField
                                error={Boolean(touched.productName && errors.productName)}
                                fullWidth
                                helperText={touched.productName && errors.productName}
                                label="Название продукта"
                                margin="normal"
                                name="productName"
                                onChange={this.handleChange}
                                value={this.state.productName}
                                variant="outlined"
                            />
                            <FormControl margin="normal" fullWidth variant="outlined">
                              <InputLabel id="demo-mutiple-name-label">Name</InputLabel>
                              <Select
                                labelId="demo-mutiple-name-label"
                                id="demo-mutiple-name"
                                value={this.state.categoryName}
                                onChange={this.handleChange}
                                inputProps={{ 'aria-label': 'category' }}
                              >
                                {this.props.categories.map((cat) => (
                                  <MenuItem key={cat.id} value={cat.categoryName}>
                                    {cat.categoryName}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                            <Grid container spacing={3}>
                                <Grid item xs={8}>
                                <TextField
                                    fullWidth
                                    error={Boolean(touched.volume && errors.volume)}
                                    helperText={touched.volume && errors.volume}
                                    label="Объем"
                                    margin="normal"
                                    name="volume"
                                    onChange={this.handleChange}
                                    value={this.state.volume}
                                    variant="outlined"
                                />
                                </Grid>
                                <Grid item xs={4}>
                                <FormControl margin="normal" fullWidth variant="outlined">
                                    <InputLabel id="demo-simple-select-label">Выберите</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    name="volumeType"
                                    value={this.state.volumeType}
                                    onChange={this.handleChange}
                                    >
                                    <MenuItem value={1}>g</MenuItem>
                                    <MenuItem value={2}>kg</MenuItem>
                                    <MenuItem value={3}>l</MenuItem>
                                    <MenuItem value={4}>ml</MenuItem>
                                    <MenuItem value={5}>kus</MenuItem>
                                    </Select>
                                </FormControl>
                                </Grid>
                            </Grid>
                            <TextField
                                error={Boolean(touched.productCode && errors.productCode)}
                                fullWidth
                                helperText={touched.productCode && errors.productCode}
                                label="Код продукта"
                                margin="normal"
                                name="productCode"
                                onChange={this.handleChange}
                                value={this.state.productCode}
                                variant="outlined"
                            />
                            <TextField
                                error={Boolean(touched.price && errors.price)}
                                fullWidth
                                helperText={touched.price && errors.price}
                                label="Цена"
                                margin="normal"
                                InputProps={{
                                startAdornment: <InputAdornment position="start">Kč</InputAdornment>,
                                }}
                                name="price"
                                onChange={this.handleChange}
                                value={this.state.price}
                                variant="outlined"
                            />
                            <DropzoneArea showFileNamesInPreview onChange={this.handleChangeImage.bind(this)} />
                            </form>
                        )}
                        </Formik>
                    </Container>
                    </Box>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={this.toggle} color="primary">
                    Отмена
                  </Button>
                  <Button autoFocus onClick={this.handleSubmit} color="primary">
                    Сохранить изменения
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          );   
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Modal);
  