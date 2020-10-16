import React from 'react';
import './App.scss';

import{
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Menu from './Menu/Menu';
import Hero from './Hero/Hero';
import HomePage from './HomePage/HomePage';
import Footer from './Footer/Footer';
import AboutPage from './AboutPage/AboutPage';
import Login from './LoginPage/LoginPage';

export default function App()  {
  return (
    <Router>
      <Menu/>
      <Hero/>
      <div className = "mainContainer">
        <Switch>
          <Route path ="/about">
            <AboutPage/>
          </Route>
          <Route path ="/login">
            <Login/>
          </Route>
          <Route path ="/">
            <HomePage/>
          </Route>
        </Switch>
      </div>
      <Footer/>
    </Router>
  );

}
