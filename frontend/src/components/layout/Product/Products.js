import React,{Fragment, useEffect, useState} from 'react';
import "./Products.css";
import {clearErrors, getProduct} from "../../../actions/productAction";
import {useSelector,useDispatch} from "react-redux";
import Loader from '../Loader/Loader.js';
import ProductCard from '../Home/ProductCard.js';
import { useParams } from 'react-router-dom';
import Pagination from "@mui/material/Pagination";
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

const categories = [
    "Electronics",
    "Smartphones",
    "Accessories",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones"
];
const Products = () => {
    const dispatch = useDispatch();
    const [currentPage ,setCurrentPage] = useState(1);
    const [price,setPrice] = useState([0,25000]);
    const [category,setCategory] = useState("");
    const {products,loading,error,productsCount,resultPerPage} = useSelector((state)=>state.products);
    const [rating,setRatings] = useState(0);
    const {keyword} = useParams();
    //need to add a pagination with price ( current pagination will show even when price filter is present)too many bugs will do later


    const setCurrentPageNo = (value) => {
        setCurrentPage(value);
    }
    const priceHandler = (event,newPrice) =>{
        setPrice(newPrice);
    }

    useEffect(() => {
        dispatch(getProduct(keyword,currentPage,price,category,rating));


    }, [dispatch,keyword,currentPage,price,category,rating]);
    const safeProductsCount = Number(productsCount) || 0;
    const safeResultPerPage = Number(resultPerPage) || 1;

    const totalPages = Math.ceil(safeProductsCount / safeResultPerPage);


    
  return (
    <Fragment>
        {loading ? (<Loader/>) :(
            <Fragment>
                <h2 className='productsHeading'>Products</h2>
                <div className='products'>
                    {products &&
                    products.map((product)=>(
                        <ProductCard key={product._id} product = {product}/>
                    ))}
                </div>
                <div className="filterBox">
                    <Typography>Price</Typography>
                    <Slider
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={0}
                        max={25000}
                    />
                    <Typography>Categories</Typography>
                    <ul className='categoryBox'>
                        {categories.map((category)=>(
                            <li className='category-link' key={category} onClick={()=>setCategory(category)}>
                                {category}
                            </li>
                        ))}
                    </ul>
                    <fieldset>
                        <Typography component="legend">Ratings Above</Typography>
                        <Slider value={rating} onChange = {(e,newRating)=>{setRatings(newRating);}} araia-labelledby ="continuous-slider" valueLabelDisplay="auto" min={0} max={5}/>
                    </fieldset>

                </div>
                {safeResultPerPage<safeProductsCount && (
                <div className="pagination">
                        <Pagination
                            className="myPagination"
                            page={currentPage}
                            count={totalPages}
                            onChange={(e,value) => setCurrentPageNo(value)}
                            showFirstButton
                            showLastButton

                            
                        />
                </div>

                )}
            </Fragment>
        )}
    </Fragment>
  )
}

export default Products