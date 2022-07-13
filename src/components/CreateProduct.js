import { Card, CardContent, Typography, Box, TextField, CardActions, Button, Snackbar, Alert } from "@mui/material";
import React from "react";
import NavigationBar from "./Navigationbar";
import { useState } from "react";
import { BASE_URL } from "../const";

const CreateProduct = () => {
  const [product, setProduct] = useState();
  const [location, setLocation] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [openEmptyAlert, setOpenEmptyAlert] = useState(false);
  const [created, setCreated] = useState(false);

  const createPostData = () => {
    const postData = {};
    if (name !== "")  postData["name"] = name;
    if (location !== "") postData["location"] = location;
    if (qty !== "") postData["qty"] = qty;
    if (price !== "") postData["price"] = price;
    if (description !== "") postData["description"] = description;

    return postData;
  };

  const postProduct = async (postData) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    };
    await fetch(`${BASE_URL}api/items/`, requestOptions)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      setProduct(data);
      setCreated(true);
    })
    .catch((e) => {
      console.log(e);
    })
  }

  const handlePost = async () => {
    const postData = createPostData();
    if ((!postData.name || !postData.location || !postData.price || !postData.qty || !postData.description)) {
      setOpenEmptyAlert(true);
      return;
    }
    
    try {
      await postProduct(postData);
    } catch (error) {
      console.log(error);
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenEmptyAlert(false);
  };



  return (
    <>
      <NavigationBar />
      <Card sx={{ minWidth: 275, m: "5px", bgcolor: "rgba(225, 247, 213, 1)" }}>
        <CardContent>
          <Typography>Add new product</Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              name="name"
              label="name"
              id="name"
              value={name}
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              name="location"
              label="location"
              id="location"
              value={location}
              required
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              name="price"
              label="price"
              id="price"
              value={price}
              required
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />

            <TextField
              margin="normal"
              fullWidth
              name="qty"
              label="qty"
              id="qty"
              value={qty}
              required
              onChange={(e) => {
                setQty(e.target.value);
              }}
            />

            <TextField
              margin="normal"
              fullWidth
              name="description"
              label="description"
              id="description"
              value={description}
              required
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handlePost}>
            Add
          </Button>
        </CardActions>
      </Card>

      <Snackbar open={created} autoHideDuration={10000}>
        <Alert variant="outlined" severity="success"
        action={
          <Button href={`/product/${product?._id}`}>
              to the product page
          </Button>
          
        }>
            Product created!
        </Alert>
      </Snackbar>

      <Snackbar open={openEmptyAlert} autoHideDuration={10000} onClose={handleClose}>
        <Alert variant="outlined" severity="warning" onClose={handleClose}>
            Please fill all fields
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreateProduct;
