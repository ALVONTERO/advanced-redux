import axios from "axios";
import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    //put request
    try {
      const response = await axios.put(
        "https://react-http-base-default-rtdb.firebaseio.com/cart.json",
        { cart }
      );
      if (!response.status === 200) {
        throw new Error("Sending cart data failed.");
      }
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
    //End of put request
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    try {
      const response = await axios(
        "https://react-http-base-default-rtdb.firebaseio.com/cart.json"
      );

      const responseData = await response.data;
      dispatch(
        cartActions.replaceCart({
          items: responseData?.cart?.items || [],
          totalQuantity: responseData?.cart?.totalQuantity || 0,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};

export const removeCartData = (id) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    try {
      const response = await axios.delete(
        "https://react-http-base-default-rtdb.firebaseio.com/cart.json",
        { id }
      );
      if (!response.status === 200) {
        throw new Error("Sending cart data failed.");
      }
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};
