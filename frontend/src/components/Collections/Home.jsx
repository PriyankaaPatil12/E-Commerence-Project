import React from "react";
import Carousel from "react-bootstrap/Carousel";
import img1 from "../../images/banner1.png";
import img2 from "../../images/gowns.webp";
const Home = () => {
  return (
    <Carousel>
      <Carousel.Item >
        <img src={img1} className="w-full" />
      </Carousel.Item>
      <Carousel.Item >
        <img src={img2} className="w-full" />
      </Carousel.Item>
    </Carousel>
  );
};

export default Home;
