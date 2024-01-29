// import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material"
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { Product } from "../../app/models/product";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const [onCart, setOnCart] = useState(false);
  const [onFavorites, setOnFavorites] = useState(false);
  
  const [loading, setLoading] = useState(false);

  const handleAddItem = (productId: number) => {
    setLoading(true);
    agent.ShoppingCart.addItem(productId)
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  } 

  return (
    <Card
      sx={{
        // maxWidth: 256,
        borderRadius: 2,
        backgroundColor: "transparent",
        border: "1px solid transparent",
        boxShadow: "none",
        position: 'relative',
        ":hover": {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.6)",
          backgroundColor: "secondary",
          border: "1px solid #000",
        },
      }}
    >
      <CardActionArea>
        <Link to={`/catalog/${product.id}`} style={{ textDecoration: "none" }}>
          <CardMedia
            sx={{
              height: 256,
              borderRadius: 2,
            }}
            image={product.pictureUrl}
            title={product.name}
          />
          <CardContent>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold" }}
              color="text.primary"
            >
              {product.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {product.brand}
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold" }}
              color="secondary.light"
              gutterBottom
            >
              $ {product.priceInARS}
            </Typography>
            <Typography variant="caption" color="secondary" gutterBottom>
              {product.priceInARS > 100000 ? "Free Shipping" : "\u00A0"}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
      <Avatar
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          marginTop: 1,
          marginRight: 1,
          backgroundColor: "rgba(200, 200, 200, 0.5)",
          zIndex: 1
        }}
        onClick={() => setOnCart(!onCart)}
      >
        <IconButton onClick={() => handleAddItem(product.id)}>
          {onCart ? (
            <ShoppingCartIcon style={{ color: "secondary" }} />
          ) : (
            <AddShoppingCartIcon style={{ color: "slate" }} />
          )}
        </IconButton>
      </Avatar>
      <Avatar
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          marginTop: 1,
          marginRight: 7,
          backgroundColor: "rgba(200, 200, 200, 0.5)",
          zIndex: 1
        }}
        onClick={() => setOnFavorites(!onFavorites)}
      >
        <IconButton>
          {onFavorites ? (
            <FavoriteIcon style={{ color: "primary" }} />
          ) : (
            <FavoriteBorderIcon style={{ color: "slate" }} />
          )}
        </IconButton>
      </Avatar>
    </Card>
  );
};

export default ProductCard;
