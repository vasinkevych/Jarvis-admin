import React from "react";

import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    const containerStyle = {
      marginTop: "60px"
    };
    return (
      <div>
        <Header/>
        <div class="container-fluid" style={containerStyle}>
          {this.props.children}
        </div>
        <Footer/>
      </div>
    );
  }
}
