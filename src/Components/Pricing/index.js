import React, { Component } from 'react';
import Header from '../Header';

class Pricing extends Component {
    render() {
        return (
          <div className="homepage">
              <div className="maxeon">
                <section className="maxeon-banner">
                  <div className="container">
                    <div className="maxeon-banner--text">
                      <h1 className="maxeon-banner-title text-shadow-drop-tr slide-right">Where words fail, Music speaks. </h1>
                    </div>
                  </div>
                </section>
              </div>
              <Header />
          </div>
        );
    }
}

export default Pricing;