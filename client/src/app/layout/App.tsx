import { useEffect, useState } from 'react'
// import './styles.css'
import { Product } from '../models/product';
import Catalog from '../../features/catalog/Catalog';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './Header';
import { Outlet } from 'react-router-dom';

function App() {

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light'

  const theme = createTheme({
    palette: {
      // mode: 'dark'
      mode: paletteType,
      background: {
        default: (paletteType=== 'light') ? '#eaeaea' : '#454545'
      }
    }
  })

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  }
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      <Container>
        <Outlet/>
      </Container>
    </ThemeProvider>
  )
}

export default App
