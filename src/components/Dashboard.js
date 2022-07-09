import React from 'react'
import { useState, useEffect } from 'react';
import { 
  Snackbar,
  Alert,
  Typography,
  Grid,
  LinearProgress,
  Box
} from '@mui/material';
import Navigationbar from './Navigationbar';
import ProductsCardsView from './cards/ProductsCardsView';
import { BASE_URL } from '../const';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true);

    await fetch(`${BASE_URL}api/items/`)
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
        setIsLoading(false);
      })
      .catch((e) => {
        setOpen(true);
        console.log(e);
      })
      .finally(() => setIsLoading(false))

  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  return (
    <>
      <Navigationbar />
      <Box>
      { isLoading? <LinearProgress color='secondary'/> : (
        <>
          <Typography
            sx={{ textAlign: 'center', margin: '20px' }}>
            Products
          </Typography>
          
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={2}>
              <ProductsCardsView products={products} />
            </Grid>

          </Grid>

          <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              Aww, something went wrong while fetching the data...
            </Alert>
          </Snackbar>
        </>
      )}
      </Box>
      
    </>
  )
}

export default Dashboard