import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  TableHead,
  Typography,
  IconButton,
} from "@mui/material";
import { CartItem } from "../../app/models/shoppingCart";
import { useDispatch } from "react-redux";
import { addItemToCart, removeItemFromCart } from "./cartSlice";
import agent from "../../app/api/agent";
// import { ClearIcon, RemoveIcon, AddIcon, AddOutlined } from '@mui/icons-material';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ClearIcon from "@mui/icons-material/Clear";

interface Props {
  items: CartItem[];
}

const ShoppingCartTable = ({ items }: Props) => {
  const dispatch = useDispatch();

  // Get current state -> Only if we need the rest of the cart.
  // const { cart } = useSelector((state: RootState) => state.cart);

  const handleRemoveByOne = (cartItem: CartItem, quantity: number) => {
    console.log(`ShoppingCartPage | removing product from state`);
    dispatch(removeItemFromCart({ cartItem, quantity }));
    console.log(`ShoppingCartPage | removing product from DB`);
    agent.ShoppingCart.removeItem(cartItem.productId);
  };

  const handleAddByOne = (cartItem: CartItem, quantity: number) => {
    console.log(
      `ShoppingCartPage | adding product to state: productId ${cartItem.productId}`
    );
    dispatch(addItemToCart({ cartItem, quantity }));
    console.log(`ShoppingCartPage | posting product to api`);
    agent.ShoppingCart.addItem(cartItem.productId);
  };

  const handleRemoveItem = (cartItem: CartItem) => {
    const qty = cartItem.quantity;
    console.log(`ShoppingCartPage | removing product from state`);
    dispatch(removeItemFromCart({ cartItem, qty }));
    console.log(`ShoppingCartPage | removing product from DB`);
    agent.ShoppingCart.removeItem(cartItem.productId);
  };


  return (
    <TableContainer sx={{ width: "100%", bgcolor: "#6C6874" }}>
      <Table>
        <TableHead>
          <TableRow 
        //   sx={{ display: "flex", flexDirection: "row" }}
          >
            <TableCell colSpan={2} align="left">Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell colSpan={3} align="center">Quantity</TableCell>
            <TableCell colSpan={1} align="right">Subtotal</TableCell>
            <TableCell></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.productId}>
              <TableCell sx={{ pr:0 }}>
                <Avatar
                  alt="productImage"
                  src={item.pictureUrl}
                  sx={{ width: 56, height: 56 }}
                />
              </TableCell>

              <TableCell align="left" sx={{ pl:0 }}>
                <Typography variant="body1">{item.name}</Typography>
              </TableCell>


              <TableCell align="right">
                <Typography variant="body2">$ {item.priceInARS}</Typography>
              </TableCell>


              <TableCell  align="right" sx={{ pr:0 }}>
                <IconButton onClick={() => handleRemoveByOne(item, 1)}>
                  <RemoveIcon />
                </IconButton>
              </TableCell>

              <TableCell align="right" sx={{ mx:0, p:0 }}>
                <Typography variant="body2">{item.quantity}</Typography>
              </TableCell>

              <TableCell align="left" sx={{ pl:0 }}>
                <IconButton onClick={() => handleAddByOne(item, 1)}>
                  <AddIcon />
                </IconButton>
              </TableCell>


              <TableCell align="center">
                <Typography variant="body2">
                  $ {item.priceInARS * item.quantity}
                </Typography>
              </TableCell>

              <TableCell align='center' sx={{ px:1}}>
                <IconButton onClick={() => handleRemoveItem(item)}>
                  <ClearIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShoppingCartTable;
