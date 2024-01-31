import { Button, Grid, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import ShoppingCartSummary from './ShoppingCartSummary';
import ShoppingCartTable from './ShoppingCartTable';
import { useGetCartQuery } from './cartApi';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setCart } from './cartSlice';
import store, { RootState } from '../../app/store/store';
// import { makeStyles, spacing } from '@material-ui/core';

// const useStyles = makeStyles({
//   root: {
//     padding: spacing(2),
//   },
//   gridItem: {
//     padding: spacing(0),
//   },
// });

const ShoppingCartPage = () => {

    // const [loading, setLoading] = useState(true);

    // const { cart } = useAppSelector(state => state.cart); 
    // const dispatch = useAppDispatch();

    // useEffect(() => {
    //     agent.ShoppingCart.get()
    //         .then(cart => dispatch(setCart(cart)))
    //         .catch(error => console.log(error))
    //         .finally(() => setLoading(false));
    // }, []);


    // const shoppingCartFromState = useSelector((state: RootState) => state.cartStore.cart);

    // useState
    // const [cartItems, setCartItems] = useState<CartItem[] | null>(null);
    
    // Query State
    // const { data: cart, isError, isLoading } = useGetCartQuery(null);

    // const dispatch = useDispatch();

    // useEffect(() => {
    //     if (!isLoading && !isError && cart) {
    //         console.log('setting cart in the state');
    //         dispatch(setCart(cart)) 
    //     } else if(isError) {
    //         console.log(`Error while setting the cart state: ${isError}`);
    //     }
    // }, [dispatch])

    // Get Store data
    const { cart } = useSelector((state: RootState) => state.cartStore);

    // Slice State
    // const dispatch = useDispatch();
    // const { cartFromState } = useSelector((state: RootState) => state.cartStore.cart)

    // Slice State
    // useEffect(() => {
    //     getCart().then(cartFromState => dispatch(setCart(cartFromState)))

        

    // }, [dispatch])

    // const list = [
    //     {id: 1, quantity: 1, name: 'pepe', priceInRobux: 120 },
    //     {id: 2, quantity: 1, name: 'pablo', priceInRobux: 120 },
    //     {id: 3, quantity: 1, name: 'pit', priceInRobux: 120 },
    //     {id: 4, quantity: 1, name: 'pierce', priceInRobux: 120 },
    //     {id: 5, quantity: 1, name: 'pop', priceInRobux: 120 },
    //     {id: 6, quantity: 1, name: 'pep', priceInRobux: 120 },
    //     {id: 7, quantity: 1, name: 'pedro', priceInRobux: 120 },
    //     {id: 8, quantity: 1, name: 'paul', priceInRobux: 120 },
    //     {id: 9, quantity: 1, name: 'pete', priceInRobux: 120 },
    //     {id: 10, quantity: 2, name: 'pierce', priceInRobux: 120 },
    //     {id: 11, quantity: 2, name: 'pop', priceInRobux: 120 },
    //     {id: 12, quantity: 2, name: 'pep', priceInRobux: 120 },
    //     {id: 13, quantity: 2, name: 'pit', priceInRobux: 120 },
    //     {id: 14, quantity: 2, name: 'pierce', priceInRobux: 120 },
    //     {id: 15, quantity: 2, name: 'pop', priceInRobux: 120 },
    //     {id: 16, quantity: 2, name: 'pep', priceInRobux: 120 },
    //     {id: 17, quantity: 2, name: 'pedro', priceInRobux: 120 },
    //     {id: 18, quantity: 2, name: 'paul', priceInRobux: 120 },
    // ]

    // if (isLoading) return <p>Loading</p>

    if (!cart) return <Typography>You shopping cart is empty</Typography>

  return (
    <Grid container spacing={0} direction="row" alignItems="start" 
    justifyContent="space-between" 
    sx={{ border: 'solid 1px',
    potision: 'relative',
    p: 0, 
    gap: 1 }} >
        {/* <Grid item xs sx={{ 
            // position: 'fixed', 
            // width: '100%', 
            bgcolor: '#9a9a9a', 
            // p: 2, 
            // alignContent: 'center', justifyContent: 'center', 
            display:'flex',
            // p: 4
            p: 4
             }}>
                <Paper sx={{ height: 140, width: '100%'}}/>
        </Grid> */}

        {/* <GridItem item xs >
            <Paper sx={{ height: 140, width: '100%'}}/>
        </GridItem> */}

        <Grid item xs={12} sm sx={{ 
            // marginLeft: '25%', 
            // width: '100%', 
            bgcolor: '#8b8b8b', 
            p: 1,
            m: 1,
            justifyItems: 'center', alignContent: 'center', justifyContent: 'center',
            display: 'flex', flexDirection: 'column'
            }} >
            {/* <TableContainer sx={{ width: '100%', bgcolor: '#6C6874',  }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Subtotal</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map(item => (
                            <TableRow key={item.id}>
                                <TableCell sx={{ display: 'flex', flexDirection: 'row', gap: 2}} >
                                    <Avatar
                                        alt="productImage"
                                        // src="/static/images/avatar/1.jpg"
                                        sx={{ width: 56, height: 56 }}
                                    >{item.name[0]}</Avatar>
                                    <Typography>
                                        {item.name}
                                    </Typography>
                                </TableCell>
                                <TableCell>$ {item.priceInRobux}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>$ {item.priceInRobux * item.quantity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> */}
            <ShoppingCartTable items={cart.items} />
        </Grid>

        <Grid item xs={12} sm={4} sx={{ 
            // position: 'fixed',
            bgcolor: '#7FB5B5',
            p: 1,
            m: 1,
            position: 'sticky',
            right: 0,
            top: 0,
            display: 'flex', flexDirection: 'column', alignItems:'center'
            }}
            // position='fixed'
            >
                <Typography variant='h5'sx={{mb:2, mt: 1}} >Buy summary</Typography>
                {/* <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{ borderTop: 'solid 1px', borderBottom: 'none' }}>Subtotal</TableCell>
                                <TableCell sx={{ borderTop: 'solid 1px', borderBottom: 'none' }}>$ 20000.99</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ borderTop: 'none'}}>Delivery Fee</TableCell>
                                <TableCell  sx={{ borderTop: 'none' }}>$ 3000</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell sx={{ borderTop: 'solid 1px', borderBottom: 'none' }} >Total</TableCell>
                                <TableCell  sx={{ borderTop: 'solid 1px', borderBottom: 'none' }} >$ 23000.99</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer> */}
                <ShoppingCartSummary items={cart.items}/>
                <NavLink to='/checkout'>
                    <Button 
                        variant='contained' 
                        color='primary' 
                        sx={{ mt: 2, mb: 1 }}
                        // LinkComponent={Link}
                        // to={'/checkout'}
                    >
                        Continue
                    </Button>
                </NavLink>
        </Grid>
    </Grid>
  )
}

export default ShoppingCartPage