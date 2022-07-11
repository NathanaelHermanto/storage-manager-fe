import React from 'react';
import { 
    Card, 
    CardActionArea, 
    CardContent,
    Typography,
 } from '@mui/material';
 import { Link as RouterLink } from 'react-router-dom'

const ProductsCard = ({ product }) => {
    return (
        <>
            <Card 
                sx={{margin:'5px', width:'250px', backgroundColor:'#e1f7d5' }}>
                <CardActionArea component={RouterLink} to={`/product/${product._id}`}>
                    <CardContent>
                        <Typography variant="h10" component="div">
                            {product.name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    )
}

export default ProductsCard;