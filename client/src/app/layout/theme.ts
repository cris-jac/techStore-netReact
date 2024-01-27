import { createTheme } from "@mui/material";

const theme = (paletteType: any) => createTheme({
    palette: {
      mode: paletteType,
      // primary: {
      //   light: (paletteType === 'light') ? '#3df4eb' : '#3df4eb',
      //   main: (paletteType === 'light') ? '#0df2e7' : '#0df2e7',
      //   dark: (paletteType === 'light') ? '#09a9a1' : '#09a9a1',
      //   contrastText: (paletteType === 'light') ? '#fff' : '#fff',
      // },
      primary: {
        light: (paletteType === 'light') ? '#3df4eb' : '#3df4eb',
        main: (paletteType === 'light') ? '#90b9e0' : '#1f496f',
        dark: (paletteType === 'light') ? '#09a9a1' : '#09a9a1',
        contrastText: (paletteType === 'light') ? '#fff' : '#fff',
      },
      secondary: {
        light: (paletteType === 'light') ? '#a6c7e6' : '#4b6d8b',
        main: (paletteType === 'light') ? '#90bae0' : '#1f496f',
        dark: (paletteType === 'light') ? '#64829c' : '#15334d',
        contrastText: (paletteType === 'light') ? '#000' : '#000',
      },
      background: {
        default: (paletteType === 'light') ? '#fbfefd' : '#010403',
      },
      text: {
        primary: (paletteType === 'light') ? '#081b1b' : '#e4f7f7',
      },
    },
  });
  
  export default theme;