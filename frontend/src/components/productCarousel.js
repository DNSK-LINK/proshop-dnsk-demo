import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";

import Loader from "./loader";
import { listTopProducts } from "../actions/productActions";

function ProductCarousel() {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return (

    <div>
      {products && products.length > 0 ? (
        <Carousel pause="hover" className="bg-dark">
          {products.map((product) => (
            <Carousel.Item key={product._id}>
              <Link to={`/product/${product._id}`}>
                <Carousel.Caption className="carousel.caption">
                  <h2>
                    {product.name} (${product.price})
                  </h2>
                </Carousel.Caption>
                <Image src={product.image} alt={product.name} fluid />
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default ProductCarousel;
