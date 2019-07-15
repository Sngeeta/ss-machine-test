import React, { Component } from 'react';
import { NavLink } from "react-router-dom"

class Header extends Component {
    render() {    		
        return (
            <header className="maxeon-header">
                <div className="container">
                    <div className="navbar navbar-fixed-top">
                        <div className="container">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navMain">
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span> 
                                </button>
                                <NavLink className="navbar-brand text-shadow-drop-tr"  to="/">Maxeon</NavLink>
                            </div>
                            <div className="collapse navbar-collapse" id="navMain">
                                <ul className="nav navbar-nav pull-right">
                                    <li><NavLink  to="/products">Products</NavLink></li>
                                    <li><NavLink  to="/features">Features</NavLink></li>
                                    <li><NavLink  to="/usecases">Use Cases</NavLink></li> 
                                    <li><NavLink  to="/pricing">Pricing</NavLink></li> 
                                    <li><NavLink  to="/login">Login</NavLink></li> 
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
          </header>
        );
    }
}

export default Header;