import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const [slider, setSlider] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div>
      <div className="background"></div>
      <section className="slider-section">
        <h1>Bienvenue sur notre site</h1>
        <Slider ref={(slider) => setSlider(slider)} {...settings}>
          <div>
            <img src="./img/enfant.jpg" alt="" />
          </div>
          <div>
            <img src="./img/photo1.jpg" alt="" />
          </div>
          <div>
            <img src="./img/photo5.jpg" alt="" />
          </div>
        </Slider>
        {slider && (
          <button className="slider-button" onClick={() => slider.slickNext()}>
            Suivant
          </button>
        )}
      </section>
    </div>
  );
}

export default Home;
