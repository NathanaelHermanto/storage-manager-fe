import React from 'react';
import { 
    Card,
    CardContent,
    Typography,
    Button,
    CardActions
 } from '@mui/material';

const ProductCard = ({ product, onClick }) => {
  return (
    <>
        <Card sx={{ minWidth: 275, m: '5px', bgcolor: 'rgba(225, 247, 213, 1)' }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {product.location}
                </Typography>
                <Typography variant="h5" component="div">
                    {product.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {product.price} €
                </Typography>
                <Typography variant="body2">
                    {product.description}
                    <br />
                    {'"blablabla"'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={onClick}>Delete Product</Button>
            </CardActions>
        </Card>
    </>
  )
};

export default ProductCard;