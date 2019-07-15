import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Components/Header';
import HomePage from './Components/Home';
import Products from './Components/Product';
import Features from './Components/Features';
import UseCases from './Components/Use-Cases';
import Pricing from './Components/Pricing';
import Login from './Components/Login';
class Router extends Component {
    render() {
      return (
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Header} />
          </Switch>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/features" component={Features} />
            <Route exact path="/usecases" component={UseCases} />
            <Route exact path="/pricing" component={Pricing} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </ BrowserRouter>
      );
    }
  }
  export default Router;
