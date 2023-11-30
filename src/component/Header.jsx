import React from "react";
import { FaSpeakerDeck } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";
import "../Style/Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 color-header d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <h1 className="display-4 text-white">
                <FaSpeakerDeck />
              </h1>
            </div>
            <div className="logo">
              <Link to="/Signup">
                <FaSignInAlt className="h2 text-white mt-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
