import { useState } from 'react'
// import './styles.css'
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import theme from './theme';

function App() {

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light'

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
