import React,{Fragment, useEffect} from 'react';
import "./Products.css";
import {clearErrors, getProduct} from "../../../actions/productAction";
import {useSelector,useDispatch} from "react-redux";
import Loader from '../Loader/Loader.js';
import ProductCard from '../Home/ProductCard.js';
import { jsx } from 'react/jsx-runtime';
const Products = () => {
    const dispatch = useDispatch();
    const {products,loading,error,productsCount} = useSelector((state)=>state.products);

    useEffect(() => {
        dispatch(getProduct());

    }, [dispatch])
    
  return (
    <Fragment>
        {loading ? (<Loader/>) :(
            <Fragment>
                <h2 className='productsHeading'>Products</h2>
                <div className='products'>
                    {products &&
                    products.map((product)=>(
                        <ProductCard key={productsCount._id} product = {product}/>
                    ))}
                </div>

            </Fragment>
        )}
    </Fragment>
  )
}

export default Products