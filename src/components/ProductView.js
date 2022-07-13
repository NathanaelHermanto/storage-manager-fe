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
    const [updated, setUpdated] = useState(false);

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
    }, [productId, updated]);

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

    const updateProduct = async (updateData) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateData)
        };
        await fetch(`${BASE_URL}api/items/${product.name}`, requestOptions)
        .then(response => response.json())
        .then((data) => {
            setProduct(data[0]);
            setUpdated(true);
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

      const handleCloseUpdated = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setUpdated(false);
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
                        <ProductCard product={product} onDelete={deleteProduct} onUpdate={updateProduct}/>

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

                        <Snackbar open={updated} autoHideDuration={10000} onClose={handleCloseUpdated}>
                            <Alert variant="outlined" severity="success" onClose={handleCloseUpdated}>
                                Update successful
                            </Alert>
                        </Snackbar>
                        
                    </>
                )}
            </Box>
            
        </>
    )
}

export default ProductView