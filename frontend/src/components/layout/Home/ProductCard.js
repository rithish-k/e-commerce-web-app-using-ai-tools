import React from 'react'
import {Link} from "react-router-dom"
import { Rating } from "react-simple-star-rating"; 


const ProductCard = ({product}) => {
  const options = {
    readonly: true,
    size: window.innerWidth < 600 ? 20: 25,
    initialValue: product.rating,
    allowFraction: true,
    fillColor: "tomato",
    emptyColor: "rgba(20,20,20,0.1)"
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
        <img src = {product.images[0].url} alt = {product.name}></img>
        <p>{product.name}</p>
        <div>
            <Rating {...options} /> <span>({product.numofReview} Reviews)</span>
        </div>
        <span>{`$${product.price}`}</span>
    </Link>
  )
}

export default ProductCard;