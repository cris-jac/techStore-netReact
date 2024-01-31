import { useEffect, useState } from 'react'
// import './styles.css'
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import theme from './theme';
import { useDispatch } from 'react-redux';
import { useGetCartQuery } from '../../features/shoppingCart/cartApi';
import { getCookie } from '../util/util';
import { setCart } from '../../features/shoppingCart/cartSlice';
// import { useStoreContext } from '../context/StoreContext';
// import agent from '../api/agent';
// // import { useAppDispatch } from '../store/configureStore_ts';
// import { setShoppingCart } from '../../features/shoppingCart/shoppingCartSlice';
// import { getCookie } from '../util/util';
// import { useGetProductsQuery } from '../../features/catalog/productApi';

function App() {

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light'

  // const { setCart } = useStoreContext();
  // OLD
  // const dispatch = useAppDispatch();
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const buyerId = getCookie('buyerId');
  //   if (buyerId) {
  //     agent.ShoppingCart.get()
  //       .then(cart => dispatch(setShoppingCart(cart)))
  //       .catch(error => console.log(error))
  //       .finally(()=>setLoading(false));
  //   }
  // }, [dispatch])


  // RTK Query
  // const { data, isError, isLoading } = useGetProductsQuery(null);

  // const theme = createTheme({
  //   palette: {
  //     // mode: 'dark'
  //     mode: paletteType,
  //     background: {
  //       default: (paletteType=== 'light') ? '#eaeaea' : '#454545'
  //     }
  //   }
  // })

  const dispatch = useDispatch();

  // Retrieve cart from api data
  const { data: cart, isError } = useGetCartQuery(null);
  
  const buyerId = getCookie('buyerId');

  useEffect(() => {
    dispatch(setCart(cart));
    console.log(`App | cookie retrieved: ${buyerId}`);
    
    if (cart) {
      console.log('Cart set to store');
    } else if (isError) {
      console.log(`Error while setting cart in store: ${isError}`);
    }
  }, [dispatch])


  const currentTheme = theme(paletteType);

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  }
  
  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      <Container>
        <Outlet/>
      </Container>
    </ThemeProvider>
  )
}

export default App
