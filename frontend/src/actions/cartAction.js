import { ADD_TO_CART ,REMOVE_CART_ITEM,SAVE_SHIPPING_INFO} from "../constants/cartConstants";
import axios from "axios";
//ADD TO CART
export const addItemsToCart=(id,quantity) => async (dispatch,getState) =>{
    try {
        const response = await fetch(
        `http://localhost:4000/api/v1/pro/product/${id}`,
        {
            method: "GET",
            credentials: "include", 
        }
        );

        const data = await response.json();

        if (!response.ok) {
        throw new Error(data.message || "Failed to fetch product");
        }

        dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            images: data.product.images[0].url,
            stock: data.product.stock,
            quantity,
        },
        });

        localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
        );
    } catch (error) {
        console.error("Add to cart failed:", error.message);
    }

}
//REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch,getState)=>{
    dispatch({
        type:REMOVE_CART_ITEM,
        payload:id,
    });
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));
}
// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
