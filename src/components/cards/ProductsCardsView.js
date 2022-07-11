import React from 'react';
import { Box } from '@mui/material';
import ProductsCard from './ProductsCard';

const ProductsCardsView = ({ products }) => {
    return (
        <>
            <Box sx={{ margin: '5px'}}>
                {products.length!==0 ? 
                products.map((product) => (<ProductsCard product={product} key={product._id}/>)) 
                : "No Results"}
            </Box>
        </>
    )
}

export default ProductsCardsView