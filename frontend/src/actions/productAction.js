import axios from "axios"
import{
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    CLEAR_ERRORS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
} from "../constants/productConstants";
export const getProduct = (keyword = "",currentPage=1,price=[0,25000],category,rating=0) => async (dispatch)=>{
    try{
        dispatch({type:ALL_PRODUCT_REQUEST});
        let link = `http://localhost:4000/api/v1/pro/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${Number(rating)}`;
        if(category){
            link = `http://localhost:4000/api/v1/pro/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&rating[gte]=${Number(rating)}`;
        }

        const response = await fetch(link);
        if(!response.ok){
            throw new Error(`https error status:${response.status}`)
        }

        const data = await response.json();
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data,
        });

    } catch(error){
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error.response?.data?.message || error.message,
        });
    }

};

export const getProductDetails = (id) => async (dispatch)=>{
    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST});
        const response = await fetch(`http://localhost:4000/api/v1/pro/product/${id}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // console.log("Dispatching product details for ID:", id);
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data.product,
        });

    } catch(error){
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response?.data?.message || error.message,
        });
    }

};
//Clearing Errors
export const clearErrors = () => async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
};