import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Dashboard from '../Components/Dashboard';
import Login from './Login';
import Template from '../Components/Template';
import Header from './Header';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './muiStyles';
import Project from '../Components/Projects';

function App() {
  
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/login"><Login /></Route>          
          <OtherRoutes/>
          <Redirect from="/" to="/login" />                       
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

function OtherRoutes(){
  return (
    <Router>
      <Header />
      <Switch>         
        <Route path="/dashboard"><Dashboard /></Route>
        <Route path="/templates"><Template /></Route>
        <Route path="/project"><Project/></Route>
        <Redirect from="/" to="/login" />     
      </Switch>
    </Router>
  );
}

export default App;

