import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
      primary: {
        main: 'rgba(10, 25, 41, 0.7)',
        dark:"#2c2c54",
        light:"#ced6e0"
      },
      secondary: {
        light: '#0066ff',
        main: '#40407a',
        contrastText: '#ffcc00',
      },
      light: {
        main:"#ced6e0"
      },
      custom: {
        light: '#ffffff',
        light2: '#ced6e0',
        main: '#f57c00',
        dark: '#fff',
        black: '#1e272e',
        blue: '#40407a'
      },
      card: {
        color1: 'rgba(62, 80, 96, 0.2)',
        color2: 'rgb(0, 30, 60)',
        error: 'rgba(199, 0, 17, 0.15)',
        errorBorder: 'rgba(235, 0, 20, 0.3)',
        success: 'rgba(26, 162, 81, 0.15)',
        successBorder: 'rgba(29, 180, 90, 0.3)',
        red: '#ff4757',
        redBorder:'#EA2027',
        black: '#227093',
        blackBorder:'#2c3e50',
        orange: '#ff793f',
        orangeBorder: '#cd6133',
        blue:'#001E3C',
        grey:'#1A2027'
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
});