import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import Header from '../Components/Header';
import SideMenu from '../Components/SideMenu';
import './App.css';
import { store } from '../actions/store';
import { Provider } from 'react-redux';
import Employee from '../pages/Employee';

const theme = createTheme({
  palette: {
    background:{
      default: "#f5f5f5"
    }
  },
  components: {
  MuiAppBar: {
    styleOverrides: {
      root: {
        transform: 'translateZ(0)'
      }
    }
  }
}
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <SideMenu />
        <div className="app-main">
          <Header />
          <Employee />
        </div>
        <CssBaseline />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
