import * as React from "react";
import Container from "react-bootstrap/esm/Container";
import Link from "@mui/material/Link";
import logo from "../../images/Logo.png"




// TODO remove, this demo shouldn't need to reset the theme.

export default function Footer() {
  return (
    
     
        <div className="start mt-20 bg-[#e9d0ba] pt-2">

       <Container>
          <footer fixed="bottom" className="footer text-start">
            <div className="footer__addr">
              <h1 className="footer__logo">
                <img src={logo} width={140}/>
              </h1>

              <h2>Contact</h2>

              <p className="text-gray">
              Petal & Pup is an Online Fashion Boutique with HQ located on the beautiful Sunshine Coast. Founded in 2023, Petal & Pup has fast become one of the largest online clothing stores in India.
              </p>
            </div>

            <ul className="footer__nav">
              <li className="nav__item">
                <h2 className="nav__title">CUSTOMER CARE</h2>

                <ul className="nav__ul">
                  <li>
                    <Link to="#">Shipping </Link>
                  </li>

                  <li>
                    <Link to="#">Returns</Link>
                  </li>

                  <li>
                    <Link to="#">Size Guide</Link>
                  </li>
                  <li>
                    <Link to="#">Privacy Policy</Link>
                  </li>
                </ul>
              </li>

              <li className="nav__item">
                <h2 className="nav__title">INFORMATION</h2>

                <ul className="nav__ul">
                  <li>
                    <Link to="#">Blog </Link>
                  </li>

                  <li>
                    <Link to="#">About</Link>
                  </li>

                  <li>
                    <Link to="#">Help and FAQs</Link>
                  </li>
                  <li>
                    <Link to="#">Refund policy</Link>
                  </li>
                </ul>
              </li>

              <li className="nav__item">
                <h2 className="nav__title">STORES</h2>

                <ul className="nav__ul">
                  <li>
                    <Link to="#">Mumbai </Link>
                  </li>
                </ul>
              </li>

            </ul>

            <div className="legal">
              <p>&copy; 2023 Something. All rights reserved.</p>

              <div className="legal__links">
                <span>
                  Made with <span className="heart">♥</span> remotely from
                  Anywhere
                </span>
              </div>
            </div>
          </footer>
       </Container>
        </div>
     
  );
}
