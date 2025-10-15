import React, { Fragment } from 'react'
import {CgMouse} from "react-icons/cg" 
import './Home.css'
import './Button.css'
import womanImage from "../../../assets/home.png";
import Product from "./Product.js"
import MetaData from "../MetaData.js"
const product = {
  name:"blue Tshirt",
  images:[{url:"https://i.ibb.co/DRST11n/1.webp"}],
  price: "$30",
  _id:"Rithish",
};
function Home() {
  return (
    <Fragment>
      <MetaData title="SHOPSIMP"/>
      <div className = "banner">
        <div className="bannerContent">
            <p>Welcome to shopsimp</p>
            <h1>Shoping Platform for simp worthy products</h1>
            <a href = "#products">
                <button className='button-85'>
                    lets simp <CgMouse></CgMouse>
                </button>
            </a>
        </div>
        <div className = "bannerImage">
          <img src={womanImage} alt = "store"/>
        </div>
        </div>

        <h2 className='homeHeading' id="products">Featured products</h2>
        <div className="container" id="container">
          <Product product={product}></Product>
          <Product product={product}></Product>
          <Product product={product}></Product>
          <Product product={product}></Product>
          <Product product={product}></Product>
          <Product product={product}></Product>
          <Product product={product}></Product>
          <Product product={product}></Product>
          <Product product={product}></Product>
        </div>
    </Fragment>

  )
}

export default Home