import React from 'react';
import { useParams } from "react-router-dom";

const ProductView = () => {
    const productId = useParams();
    console.log(productId)
    
    return (
        <>
            {productId.id}
        </>
    )
}

export default ProductView