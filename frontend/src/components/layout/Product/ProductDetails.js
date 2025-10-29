import {React,Fragment} from 'react'
import {useSelector,useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import { clearErrors, getProductDetails } from '../../../actions/productAction';
import { useEffect,useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import "./ProductDetails.css"
import ReviewCard from "./ReviewCard.js";
import Loader from '../Loader/Loader.js';
import toast from 'react-hot-toast';
const ProductDetails = ({}) => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {product,loading,error} = useSelector((state)=>state.productDetails);
    useEffect(() => {
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProductDetails(id))
    }, [dispatch,id,error])
const options = {
    readonly: true,
    size: window.innerWidth < 600 ? 20: 25,
    initialValue: product.rating,
    allowFraction: true,
    fillColor: "tomato",
    emptyColor: "rgba(20,20,20,0.1)"
  };    
  return (
    <Fragment>
        {loading ? (<Loader/>) : 
        (<Fragment>
        <div className="ProductDetails">
            <div>
                {product.images && product.images.length>0 && (
                    <img
                    className="CarouselImage"
                    key={product.images[0].url}
                    src={product.images[0].url}
                    alt ={`${id} Slide`}
                    />
                )}
            </div>

            <div>

                <div className='detailsBlock-1'>
                    <h2>{product.name}</h2>
                    <p>Product # {product._id}</p>
                </div>

                <div className='detailsBlock-2'>
                    <Rating {...options}/>
                    <span> ({product.numofReview} Reviews)</span>
                </div>

                <div className='detailsBlock-3'>
                    <h1>{`$${product.price}`}</h1>

                    <div className='detailsBlock-3-1'>

                        <div className='detailsBlock-3-1-1'>
                            <button>-</button>
                            <input value="1" type='number'/>
                            <button>+</button>
                        </div>{' '}

                        <button>Add to Cart</button>
                    </div>

                    <p>
                        Status:{" "}
                        <b className={product.Stock<1 ? "redColor":"greenColor"}>
                            {product.Stock<1 ? "Out of Stock":"InStock"}
                        </b>
                    </p>

                </div>

                <div className="detailsBlock-4">
                    Description : <p>{product.description}</p>
                </div>

                <button className='submitReview'>Submit Review</button>

            </div>
        </div>
        <h3 className='reviewsHeading'>Reviews</h3>
        {product.reviews && product.reviews[0] ? (
            <div className='reviews'>
                {product.reviews && product.reviews.map((review) => <ReviewCard review={review}/>)}
            </div>
        ): (<p className='noReviews'> No Reviews Yet </p>)
        }

    </Fragment>)}
    </Fragment>
  )
}

export default ProductDetails;