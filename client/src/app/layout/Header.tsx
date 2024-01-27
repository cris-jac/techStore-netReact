// import { ClassNames } from "@emotion/react";
import { ShoppingCart, AccountCircleRounded, SearchRounded } from "@mui/icons-material";
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Badge, Box, FormControl, InputAdornment, List, ListItem, ListItemText, OutlinedInput, Switch, Toolbar } from "@mui/material"
import { NavLink } from "react-router-dom";
import logo from "/images/logo_2.png";

import HeaderButton from "../components/HeaderButton";
import SideMenu from "../components/SideMenu";

// const midLinks = [
//   { title: 'catalog', path: '/catalog' },
//   { title: 'about', path: '/about' },
//   { title: 'contact', path: '/contact' },
// ]

// const rightLinks = [
//   { title: 'login', path: '/login' },
//   { title: 'register', path: '/register' },
// ]

// const mode = 'dark';

// const localTheme = { 
//   palette: {
//     mode: mode, // Set the default mode here
//     ...themeColors[mode],
//   },
//   components: {
//     MuiToolbar: {
//       variants: {
//         first: {
//           backgroundColor: themeColors[mode].primary.main,
//         },

//       }
//     },
//   },
  // color: 'inherit', 
  // customizeList: {
  //   textDecoration: 'none',
  //   typography: 'h6',
  //   ":hover": {
  //     color: theme.palette.primary
  //   },
  //   ":active": {
  //     color: 'text.primary'
  //   },
  // },
  // customizeToolbar1: {
  //   minHeight: '36px',
  //   // borderTop: '2px solid',
  //   borderBottom: '2px solid', 
  //   borderColor: 'secondary.main',
  //   pb: 0,
  //   pt: 0,
  //   display: 'flex', 
  //   justifyContent: 'space-between', 
  //   alignItems: 'center',
  // },
  // customizeToolbar2: {
  //   minHeight: '36px',
  //   borderBottom: '2px solid', 
  //   borderColor: themeColors[mode].primary.main,
  //   pb: 0,
  //   pt: 0,
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // },
  // customListItem: {
  //   pb: 2,
  //   pt: 2,
  //   textDecoration: 'none',
  // }
// };

const categories = ['Category1', 'Category2', 'Category3'];
const brands = ['Brand1', 'Brand2', 'Brand3']

const localStyle = {
  appBar: {
    boxShadow: 'none', 
  },
  firstToolBar: {
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    py: 1
  },
  secondsToolBar: {
    borderTop: '2px solid',
    borderBottom: '2px solid', 
    borderColor: 'secondary.dark',
    py: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    mx: 1,
  },
  button: {
    mx: 1, 
    textTransform: 'capitalize',
    color: 'text.primary',
  },
  box: {},
  list: {
    display: 'flex', 
    flexDirection: 'row',
    justifyContent: 'space-around', 
    alignContent: 'center',
    width: '100%',
    // alignItems: 'space-between',
    pt: 0,
    pb: 0,
    px: 2
  },
  listItem: { my: 0, py: 0, display: 'flex', alignContent: 'center' },
  listItemText: {
    fontSize: '16px', 
    textDecoration: 'none', 
    color: 'text.primary',
    textAlign: 'center'
  }
} 

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

const Header = ({ darkMode, handleThemeChange } : Props) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
    <AppBar 
      position="static" 
      sx={{ 
        boxShadow: 'none'
       }}
      color = "transparent"
    >
        <Toolbar sx={localStyle.firstToolBar}>
          <Box display='flex' alignItems='center'>
            {/* <Typography 
              variant="h6" 
              component={NavLink} 
              to='/'
              sx={navStyles}
            >
                Tech Store
            </Typography> */}
            {/* <Button
              // color="primary"
              size="small"
              sx={localStyle.button}
              startIcon={<MenuRounded />}
            >
              Menu
            </Button> */}

            <SideMenu categories={categories} brands={brands} />

            {/* <Button 
              size="small"
              href="/"
            >
              <img src={logo} height={48}></img>
            </Button> */}

            <HeaderButton 
              to="/"
              img={logo}
            />
          </Box>
            
          <Box>
            {/* <List sx={{ display: 'flex' }}>
              {midLinks.map(({ title, path }) => (
                <ListItem 
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={navStyles.cusomtizeList}
                >
                  {title.toUpperCase()}
                </ListItem>
              ))}
            </List> */}
            <FormControl size="small" variant="outlined">
              <OutlinedInput startAdornment={
                <InputAdornment position="start">
                  <SearchRounded/>
                </InputAdornment>
              }>

              </OutlinedInput>
            </FormControl>
          </Box>

          <Box display='flex' alignItems='center'>
            {/* <Button 
              color="inherit"
              sx={{ mr:2, textTransform: 'capitalize' }}
            >
              <Badge badgeContent={4} color="secondary">
                <ShoppingCart/>
              </Badge>
              <Typography sx={{ ml: 1 }} >Cart</Typography>
            </Button> */}

            <Switch 
              size="small"
              checked={darkMode} 
              onChange={handleThemeChange} 
              color="primary"
              // sx={{ color: 'secondary.main' }}
            />

            {/* <Button
              // color="secondary"
              sx={localStyle.button}
              size="small"
              startIcon={
                <Badge 
                  badgeContent={4} 
                  color="primary"
                  
                >
                  <ShoppingCart />
                </Badge>
              }
            >
              Cart
            </Button> */}

            <HeaderButton 
              to="/cart" 
              label="Cart" 
              icon={
                <Badge 
                  badgeContent={4} 
                  color="primary"    
                >
                  <ShoppingCart />
                </Badge>
              } 
            />

            {/* <Button
              size="small"
              href="/login"
              sx={localStyle.button}
              startIcon={<AccountCircleRounded />}
            >
              Sing In
            </Button> */}

            <HeaderButton to="/login" label="Sign In" icon={<AccountCircleRounded />} />

            {/* <List sx={{ display: 'flex' }}>
              {rightLinks.map(({ title, path }) => (
                <ListItem 
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={navStyles}
                >
                  {title.toUpperCase()}
                </ListItem>
              ))}
            </List> */}
          </Box>

        </Toolbar>
    </AppBar>

    <AppBar 
      sx = {{...localStyle.appBar, mb: 4, height: '32px'}}
    // sx={{ 
    //   mb: 4, 
    //   boxShadow: 'none', 
    //   height: '42px',
    //   paddingTop: 0,
    //   paddingBottom: 0,
    // }}
    color="transparent" 
    position="sticky">
      <Toolbar 
        variant="dense"
        sx={ {...localStyle.secondsToolBar, minHeight: '32px'}
          // { 
          // borderTop: '2px solid',
          // borderBottom: '2px solid', 
          // borderColor: 'secondary.main',
          // pb: 0,
          // pt: 0,
          // display: 'flex',
          // justifyContent: 'center',
          // alignItems: 'center',
          // mx: 1
          // // paddingTop: 0,
          // // paddingBottom: 0,
          // height: '100%',
          // // backgroundColor: 'gold',
          // }

          // navStyles.customizeToolbar2

          // { mx: 1 }
        } 
      >
        <List 
          sx={localStyle.list}
          disablePadding
        >
          {categories.map((category) => (
            <ListItem 
              // sx={
                // ...navStyles, 
              //   {
              //   pt: 0,
              //   pb: 0,
              //   height: 'inherit',
              //   backgroundColor: 'gray'
              // } 

                // navStyles.cusomtizeList
              // }
              sx = {localStyle.listItem}
              disablePadding 
              component={NavLink}
              to={'/catalog'}
              key={category}
            >
              <ListItemText sx={localStyle.listItemText}>
                {category}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Toolbar>
    </AppBar>
    </div>
  )
}

export default Header