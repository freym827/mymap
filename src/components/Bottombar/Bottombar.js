import React, { Component } from 'react'
//import axios from 'axios'
import './bottombar.css'

  class Bottombar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        expanded: false
      }
    }

    toggleBottom () {
      document.getElementById("expand").classList.toggle("openBottom")
      document.getElementById("thing").classList.toggle("rotate")
      document.getElementById("containers").classList.toggle("display")
    }

    render() {
      return (
        <div id="expand" className="bottomContainer">
          <div className="outerContianer">

            <div className="opening" onClick={() => {this.toggleBottom()}}>
              <i id="thing" className="fas fa-angle-up fa-3x"></i>
              <div className="middle">
                <h3>Book a Muber</h3>
                <span>Friends with trucks</span>
              </div>
            </div>

            <div id="containers" className="bottomOuterContainer">
              <div className="bottomInnercontainer">
                <div>
                  <button className="bottomButton">
                    <i className="fas fa-truck-pickup"></i>
                    Truck Only
                  </button>
                </div>
                <div>
                  <button className="bottomButton">
                    <i className="fas fa-truck-pickup"></i>
                    Truck with Help
                  </button>
                </div>
                <div>
                  <button className="bottomButton">
                    <i className="fas fa-truck-pickup"></i>
                    Future Move
                  </button>
                </div>
                <div>
                  <button className="bottomButton">
                    <span className="bold">Small</span>
                    <br/>
                    <span>&lt; 250lbs.</span>
                  </button>
                </div>
                <div>
                  <button className="bottomButton">
                    <span className="bold">Medium</span>
                    <br/>
                    <span>&gt; 250lbs.</span>
                  </button>
                </div>
                <div>
                  <button className="bottomButton">
                    <span className="bold">Large</span>
                    <br/>
                    <span>&gt; 500lbs.</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  export default Bottombar