import { useEffect, useState } from 'react'
// import './styles.css'
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import theme from './theme';
// import { useStoreContext } from '../context/StoreContext';
import agent from '../api/agent';
import { useAppDispatch } from '../store/configureStore';
import { setShoppingCart } from '../../features/shoppingCart/shoppingCartSlice';
import { getCookie } from '../util/util';

function App() {

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light'

  // const { setCart } = useStoreContext();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      agent.ShoppingCart.get()
        .then(cart => dispatch(setShoppingCart(cart)))
        .catch(error => console.log(error))
        .finally(()=>setLoading(false));
    }
  }, [dispatch])

  // const theme = createTheme({
  //   palette: {
  //     // mode: 'dark'
  //     mode: paletteType,
  //     background: {
  //       default: (paletteType=== 'light') ? '#eaeaea' : '#454545'
  //     }
  //   }
  // })

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
