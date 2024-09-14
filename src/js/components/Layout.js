import React from "react";
import HeaderContainer from "../containers/HeaderContainer";
import Footer from "./Footer"; // Import the Footer component

class Layout extends React.Component {
  render() {
    return (
      <div>
        <HeaderContainer />
        {this.props.children}
        <Footer /> {/* Render the Footer component */}
      </div>
    );
  }
}

export default Layout;
