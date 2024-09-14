import React from "react";

class Footer extends React.Component {
  render() {
    const currentYear = new Date().getFullYear();
    return (
      <footer>
        <div className="footer-content">
        &copy; {currentYear} Your Website. All rights reserved.
        </div>
      </footer>
    );
  }
}
export default Footer;
