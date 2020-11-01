import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { NotificationManager } from 'react-notifications';

const useStyles = makeStyles({
  root: {
    maxWidth: 375,
    display: 'flex',
    flexDirection: 'column',
  },
  media: {
    width: '100%', 
    height: '200px', 
    margin: 'auto',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

const ProductCard = ({ product }) => {
  const classes = useStyles();

  const handleChange = () => {
    NotificationManager.info('Allergens button has pressed', 'Information!', 3000);
  };

  return (
    <div>
    <Card className={classes.root}>
      <CardHeader
        action={(
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        )}
        title={product.product.productName}
        subheader={product.product.volume + ' ' + product.volumeType.volumeCode }
      />
      <CardMedia
        className={classes.media}
        component="img"
        alt="Contemplative Reptile"
        height="20%"
        src={`data:image/jpeg;base64,${product.image.imageData}`}
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography gutterBottom variant="h3" component="h2">
          {product.product.price + ' Kč'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Composition
        </Button>
        <Button size="small" color="primary" onClick={handleChange}>
          Allergens
        </Button>
      </CardActions>
    </Card>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductCard;
