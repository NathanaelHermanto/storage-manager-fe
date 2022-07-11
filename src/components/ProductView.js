import React, { useState, useEffect } from 'react';
import { Box, LinearProgress, Snackbar, Alert, Button } from '@mui/material';
import { useParams } from "react-router-dom";
import NavigationBar from './Navigationbar';
import ProductCard from './cards/ProductCard';
import { BASE_URL } from '../const';

const ProductView = () => {
    const productId = useParams();
    const [product, setProduct] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);

    const fetchProduct = async () => {
        setIsLoading(true);

        await fetch(`${BASE_URL}api/items/id/${productId.id}`)
        .then(response => response.json())
        .then((data) => {
            setProduct(data[0]);
            setIsLoading(false);
        })
        .catch((e) => {
            console.log(e);
        })
        .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        fetchProduct();
        // eslint-disable-next-line
    }, []);

    const deleteProduct = async () => {
        await fetch(`${BASE_URL}api/items/id/${productId.id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then((data) => {
            if (data.deletedCount > 0){
                setDeleted(true);
            } else {
                setDeleted(false);
            }
            setOpenAlert(true);
        })
        .catch((e) => {
            setOpenAlert(true);
            console.log(e);
        })
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenAlert(false);
      };

    if(!product) {
        return (
            <>
                <Snackbar open={true} autoHideDuration={10000}>
                    <Alert severity="error" sx={{ width: '100%' }}>
                        Aww, something went wrong while fetching the data...
                    </Alert>
                </Snackbar>
            </>
        )
    }

    return (
        <>
            <NavigationBar/>
            <Box>
                { isLoading? <LinearProgress color='secondary'/> : (
                    <>
                        <ProductCard product={product} onClick={deleteProduct}/>

                        <Snackbar open={openAlert} autoHideDuration={10000} onClose={handleClose}>
                            {
                                deleted? 
                                <Alert severity="success" sx={{ width: '100%' }} 
                                action={
                                    <Button href='/'>
                                        Go Home
                                    </Button>
                                    
                                }>
                                    Product deleted!
                                </Alert> :
                                <Alert variant="outlined" severity="warning" onClose={handleClose} 
                                action={
                                    <Button href='/'>
                                        Go Home
                                    </Button>
                                    
                                }>
                                    Failed to delete the product...
                                </Alert>
                            }
                        </Snackbar>
                        
                    </>
                )}
            </Box>
            
        </>
    )
}

export default ProductView