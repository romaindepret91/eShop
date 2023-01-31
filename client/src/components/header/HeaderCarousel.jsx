import { Carousel, Button } from "react-bootstrap";
import carousel1 from "../../assets/images/carousel1.jpeg";
import carousel2 from "../../assets/images/carousel2.jpg";
import carousel3 from "../../assets/images/carousel3.jpg";
import "./HeaderCarousel.scss";

export default function HeaderCarousel() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <div
          style={{ backgroundImage: `url(${carousel1})` }}
          className="img-container"
        >
          <div className="overlay"></div>
        </div>
        <Carousel.Caption style={{ bottom: "12rem" }}>
          <h3>Muay Thai gear for all</h3>
          <Button className="mt-3" variant="light">
            Shop All Products
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div
          style={{ backgroundImage: `url(${carousel2})` }}
          className="img-container"
        >
          <div className="overlay"></div>
        </div>
        <Carousel.Caption style={{ bottom: "12rem" }}>
          <h3>Muay Thai gear for men</h3>
          <Button className="mt-3" variant="light">
            Shop Men Products
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div
          style={{ backgroundImage: `url(${carousel3})` }}
          className="img-container"
        >
          <div className="overlay"></div>
        </div>

        <Carousel.Caption style={{ bottom: "12rem" }}>
          <h3>Muay Thai gear for women</h3>
          <Button className="mt-3" variant="light">
            Shop Women Products
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
