import React, { Fragment, useEffect, useEffectEvent } from 'react'
import {CgMouse} from "react-icons/cg" 
import './Home.css'
import './Button.css'
import womanImage from "../../../assets/home.png";
import Product from "./Product.js"
import MetaData from "../MetaData.js"
import {getProduct} from "../../../actions/productAction";
import {useSelector,useDispatch} from "react-redux";
import Loader from '../Loader/Loader.js';
import toast from 'react-hot-toast';
function Home() {
  const dispatch = useDispatch();
  const {loading,error,products,productCount} = useSelector((state)=>state.products);
  useEffect(() => {
    if(error){
      toast.error(error);
    }
    dispatch(getProduct());

  }, [dispatch,error]);
  

  return (
    <Fragment>
      {loading ? <Loader/>:(
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
            {products && products.map((product)=> <Product product={product}/>)}
          </div>
      </Fragment>
      )}

    </Fragment>

  )
}

export default Home