import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function Home() {
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,  
    fade: true,  
    cssEase: 'ease',  
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, 
  };
  
  
  return (
    <div class="scroll-container">
      <div className="background"></div>
      <section className="slider-section">
        <Slider {...settings}>
          <div>
            <img src="./img/enfant.jpg" alt="" />
          </div>
          <div>
            <img src="./img/photom.jpg" alt="" />
          </div>
          <div>
            <img src="./img/photo5.jpg" alt="" />
          </div>
        </Slider>
      </section>
    </div>
  );
}


export default Home;
