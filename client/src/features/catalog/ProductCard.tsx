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
// import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
// import { setShoppingCart } from "../shoppingCart/shoppingCartSlice";
import { 
  useDispatch, useSelector, 
  // useSelector 
} from "react-redux";
// import { CartItem, ShoppingCart } from "../../app/models/shoppingCart";
import { addItemToCart, removeItemFromCart, setCart } from "../shoppingCart/cartSlice";
import { CartItem } from "../../app/models/shoppingCart";
import { useAddItemToCartMutation, useGetCartQuery, useRemoveItemFromCartMutation } from "../shoppingCart/cartApi";
import { RootState } from "../../app/store/store";
// import { RootState } from "../../app/store/configureStore";


interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const [isOnCart, setIsOnCart] = useState(false);
  const [isOnFavorites, setIsOnFavorites] = useState(false);
  
  // For Thunk
  // const { status } = useSelector((state: RootState) => state.cart);


  // const [loading, setLoading] = useState(false);

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

  const {cart} = useSelector((state: RootState) => state.cartStore);

  useEffect(() => {
    console.log("Update set cart store");
    dispatch(setCart(cart))
  }, [cart]);


  //
  // // Setting Api data
  // const { data: cart, isError, isLoading } = useGetCartQuery(null);

  // // Updating the Store data
  // useEffect(() => {
  //     if (!isLoading && !isError && cart) {
  //         console.log('setting cart in the state');
  //         dispatch(setCart(cart)) 
  //     } else if(isError) {
  //         console.log(`Error while setting the cart state: ${isError}`);
  //     }
  // }, [cart, dispatch])      // Since there are other methods dispatched

  // Api Requests
  const [addItem] = useAddItemToCartMutation();
  const [removeItem] = useRemoveItemFromCartMutation();

  // Get Cart State
  // const cartFromState = useSelector(
  //   (state: RootState) => state.cartStore.cart
  // )

  // Get Updated Cart State
  // useEffect(() => {
  //   setLoading(true);
  //   useDispatch(useGetCartQuery)
  //     .then(cart => dispatch(setCart(cart)))
  //     .catch(error => console.log(error))
  //     .finally(() => setLoading(false))
  // }, [dispatch]);


  // const { cart } = useSelector((state: RootState) => state.cart);

  // Get Cart from Agent
  // useEffect(() => {
  //   setLoading(true);
  //   agent.ShoppingCart.get()
  //     .then(cart => dispatch(setCart(cart)))
  //     .catch(error => console.log(error))
  //     .finally(() => setLoading(false))
  // }, [dispatch]);

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

  const handleCartItem = async (product: Product) => {

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

    if (isOnCart) {
      dispatch(removeItemFromCart({ cartItem, quantity }));
      await removeItem({
        productId: product.id,
        quantity: quantity        
      })

      // USING AGENT
      // console.log(`ProductCard | remove item: productId ${cartItem.productId}`);
      // dispatch(removeItemFromCart({ cartItem, quantity }));
      // console.log(`ProductCart | removing product from DB`);
      // agent.ShoppingCart.removeItem(cartItem.productId);
    } else {
      // For State
      dispatch(addItemToCart({ cartItem, quantity }))
      // For Api
      console.log(`productId: ${product.id} || quantity: ${quantity}`)
      await addItem({       // First error
        productId: product.id,
        quantity: quantity
      })


      // USING AGENT
      // console.log(`ProductCard | adding product to status: productId ${cartItem.productId}, quantity: ${quantity}`);
      // dispatch(addItemToCart({ cartItem, quantity }));
      // console.log(`ProductCart | posting product`);
      // agent.ShoppingCart.addItem(cartItem.productId)
      // setOnCart(true);

      // TRY THUNK
      // dispatch(addItemToCartAsync({ productId: product.id, quantity: quantity } as { productId: number, quantity?: number }));
    }

    setIsOnCart(!isOnCart);
  }



  // if (loading) return <p>Still loading...</p>

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
        onClick={() => handleCartItem(product)}       /// 2nd error
      >
        <IconButton 
        // onClick={() => handleAddItem(product)}
        >
          {isOnCart ? (
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
        onClick={() => setIsOnFavorites(!isOnFavorites)}
      >
        <IconButton>
          {isOnFavorites ? (
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
