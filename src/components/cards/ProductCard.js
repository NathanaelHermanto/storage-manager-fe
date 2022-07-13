import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Box,
  TextField,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";

const ProductCard = ({ product, onDelete, onUpdate }) => {
  const [expanded, setExpanded] = useState(false);
  const [location, setLocation] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const createUpdateData = () => {
    const updateData = {};
    if (location !== "") updateData["location"] = location;
    if (qty !== "") updateData["qty"] = qty;
    if (price !== "") updateData["price"] = price;
    if (description !== "") updateData["description"] = description;

    return updateData;
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleUpdate = async () => {
    handleExpandClick();
    const updateData = createUpdateData();

    try {
        await onUpdate(updateData);
    } catch (e) {
        console.log(e);
    }
  };
  return (
    <>
      <Card sx={{ minWidth: 275, m: "5px", bgcolor: "rgba(225, 247, 213, 1)" }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {product.location}
          </Typography>
          <Typography variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {product.price} € | {product.qty}
          </Typography>
          <Typography variant="body2">
            {product.description}
            <br />
            {'"made in China"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={onDelete}>
            Delete Product
          </Button>
          <Button size="small" onClick={handleExpandClick}>
            Update Product
          </Button>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Update Product</Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                name="location"
                label="location"
                id="location"
                value={location}
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
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Box>
          </CardContent>

          <CardActions>
            <Button size="small" onClick={handleExpandClick}>
              Cancel
            </Button>
            <Button size="small" onClick={handleUpdate}>
              Update
            </Button>
          </CardActions>
        </Collapse>
      </Card>
    </>
  );
};

export default ProductCard;
