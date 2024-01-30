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
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
// import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
// import { setShoppingCart } from "../shoppingCart/shoppingCartSlice";
import { 
  useDispatch, 
  // useSelector 
} from "react-redux";
// import { CartItem, ShoppingCart } from "../../app/models/shoppingCart";
import { addItemToCart, removeItemFromCart, setCart } from "../shoppingCart/cartSlice";
import { CartItem } from "../../app/models/shoppingCart";
// import { RootState } from "../../app/store/configureStore";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const [onCart, setOnCart] = useState(false);
  const [onFavorites, setOnFavorites] = useState(false);
  

  // const { shoppingCart } = useAppSelector(state => state.shoppingCart);
  // const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  // const handleAddItem = (productId: number) => {
  //   setLoading(true);
  //   agent.ShoppingCart.addItem(productId)
  //     .then(shoppingCart => dispatch(setShoppingCart(shoppingCart)))
  //     .catch(error => console.log(error))
  //     .finally(() => setLoading(false))
  // } 


  // New
  // const [cartItems, setCartItems] = useState<CartItem[] | null>();
  const dispatch = useDispatch();
  // const { cart } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    setLoading(true);
    agent.ShoppingCart.get()
      .then(cart => dispatch(setCart(cart)))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }, [dispatch]);

  // const handleAddItem = (product: Product) => {
  //   let quantity = 1;

  //   const cartItem: CartItem = {
  //     productId: product.id,
  //     name: product.name,
  //     priceInARS: product.priceInARS,
  //     pictureUrl: product.pictureUrl,
  //     category: product.category,
  //     brand: product.brand,
  //     quantity: quantity
  //   }

  //   console.log(`ProductCard | adding product to status: productId ${cartItem.productId}, quantity: ${quantity}`);
  //   dispatch(addItemToCart({ cartItem, quantity }));
  //   console.log(`ProductCart | posting product`);
  //   agent.ShoppingCart.addItem(cartItem.productId)
  //   setOnCart(true);
  // }

  const handleCartItem = (product: Product) => {

    let quantity = 1;

    const cartItem: CartItem = {
      productId: product.id,
      name: product.name,
      priceInARS: product.priceInARS,
      pictureUrl: product.pictureUrl,
      category: product.category,
      brand: product.brand,
      quantity: quantity
    }

    if (onCart) {
      console.log(`ProductCard | remove item: productId ${cartItem.productId}`);
      dispatch(removeItemFromCart({ cartItem, quantity }));
      console.log(`ProductCart | removing product from DB`);
      agent.ShoppingCart.removeItem(cartItem.productId);
    } else {
      console.log(`ProductCard | adding product to status: productId ${cartItem.productId}, quantity: ${quantity}`);
      dispatch(addItemToCart({ cartItem, quantity }));
      console.log(`ProductCart | posting product`);
      agent.ShoppingCart.addItem(cartItem.productId)
      setOnCart(true);
    }

    setOnCart(!onCart);
  }



  if (loading) return <p>Still loading...</p>

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
        onClick={() => handleCartItem(product)}
      >
        <IconButton 
        // onClick={() => handleAddItem(product)}
        >
          {onCart ? (
            <ShoppingCartIcon style={{ color: "secondary" }}/>
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
