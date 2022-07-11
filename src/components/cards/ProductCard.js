import React, { useState } from 'react';
import { 
    Card,
    CardContent,
    Typography,
    Button,
    CardActions,
 } from '@mui/material';
 import Collapse from '@mui/material/Collapse';

const ProductCard = ({ product, onClick }) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
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
                    {'"made in China"'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={onClick}>Delete Product</Button>
                <Button size="small" onClick={handleExpandClick}>Update Product</Button>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Update Product</Typography>
                
                </CardContent>
            </Collapse>
        </Card>
    </>
  )
};

export default ProductCard;