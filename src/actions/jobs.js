import {storeurl} from '../config/config';
import axios from 'axios';

export const getOrders = (data, rsl, rej) => {
  return (dispatch) => {
    axios(`${storeurl}/Authentication/get_vendor_order`, {
      method: 'post',
      data,
    })
      .then((res) => {
        if (res.data.status == true && res.data.data.length > 0) {
          dispatch({
            type: 'GET_ORDERS',
            orders: res.data.data,
          });
          rsl(res);
        } else if (
          res.data.status == false &&
          res.data.message == 'Invalid Session or Mobile no.'
        ) {
          dispatch({
            type: 'SESSION',
          });
        } else if (
          res.data.status == false &&
          res.data.message == 'No orders'
        ) {
          dispatch({
            type: 'NO_ORDERS',
          });
          rsl(res);
          console.log(res);
        } else {
          rej(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        rej(err.message);
      });
  };
};
export const getCompletedOrders = (data, rsl, rej) => {
  return (dispatch) => {
    axios(`${storeurl}/Authentication/get_completed_vendor_order`, {
      method: 'post',
      data,
    })
      .then((res) => {
        console.log(res);
        if (res.data.status == true && res.data.data.length > 0) {
          dispatch({
            type: 'GET_COMPLETED_ORDERS',
            completedOrders: res.data.data,
            noCompletedOrders: false,
          });
        } else if (
          res.data.status == false &&
          res.data.message == 'No orders'
        ) {
          dispatch({
            type: 'GET_COMPLETED_ORDERS',
            noCompletedOrders: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const getOrderStatus = (data, rsl, rej) => {
  return (dispatch) => {
    axios(`${storeurl}/Authentication/curent_order_status`, {
      method: 'post',
      data,
    })
      .then((res) => {
        if (res.data.status == true) {
          rsl(res.data.data);
        } else if (
          res.data.status == false &&
          res.data.message == 'Invalid Session or Mobile no.'
        ) {
          dispatch({
            type: 'SESSION',
          });
        } else if (
          res.data.status == false &&
          res.data.message == 'Order not started yet'
        ) {
          rsl('-1');
        } else {
          rej(res.data.message);
        }
      })
      .catch((err) => {
        rej(err.message);
      });
  };
};
export const updateOrderStatus = (data, rsl, rej) => {
  return (dispatch) => {
    axios(`${storeurl}/Authentication/process_order_status`, {
      method: 'post',
      data,
    })
      .then((res) => {
        rsl(res);
      })
      .catch((err) => {
        rej(err.message);
      });
  };
};
export const updateOrderStatusSnap = (data, rsl, rej) => {
  return (dispatch) => {
    axios(`${storeurl}/Authentication/take_snap`, {
      method: 'post',
      data,
    })
      .then((res) => {
        if (res.data.status == true) {
          rsl(res);
        } else if (
          res.data.status == false &&
          res.data.message == 'Invalid Session or Mobile no.'
        ) {
          dispatch({
            type: 'SESSION',
          });
        } else {
          rej(res.data.message);
        }
      })
      .catch((err) => {
        rej(err.message);
      });
  };
};
export const updateOrderPayment = (data, rsl, rej) => {
  return (dispatch) => {
    axios(`${storeurl}/Authentication/order_payment`, {
      method: 'post',
      data,
    })
      .then((res) => {
        console.log(res);
        if (res.data.status == true) {
          rsl();
        } else if (
          res.data.status == false &&
          res.data.message == 'Invalid Session or Mobile no.'
        ) {
          dispatch({
            type: 'SESSION',
          });
        } else {
          rej(res.data.message);
        }
      })
      .catch((err) => {
        rej(err.message);
      });
  };
};

export const getFilter = (phone, session, model, rsl, rej) => {
  return (dispatch) => {
    const formData = new FormData();
    formData.append('phone_no', phone);
    formData.append('session_key', session);
    formData.append('model_id', model);
    axios(`${storeurl}/Authentication/get_additional_items_price`, {
      method: 'post',
      data: formData,
    })
      .then((res) => {
        if (res.data.status == true) {
          rsl(res.data.data);
        } else if (
          res.data.status == false &&
          res.data.message == 'Invalid Session or Mobile no.'
        ) {
          dispatch({
            type: 'SESSION',
          });
        } else if (res.data.status == false) {
          rej(res.data.message);
        }
      })
      .catch((err) => rej(err.message));
  };
};
export const updateOrder = (data, rsl, rej) => {
  return (dispatch) => {
    axios(`${storeurl}/Authentication/update_order`, {
      method: 'post',
      data,
    })
      .then(async (res) => {
        if (res.data.status == true) {
          rsl();
        } else if (
          res.data.status == false &&
          res.data.message == 'Invalid Session or Mobile no.'
        ) {
          dispatch({
            type: 'SESSION',
            sessionExpired: true,
          });
        } else if (res.data.status == false) {
          rej(res.data.message);
        }
      })
      .catch((err) => rej(err.message));
  };
};
export const removeOrderDetails = () => {
  return (dispatch) => {
    dispatch({
      type: 'ORDER_DETAILS',
    });
  };
};
export const giverating = (data, phone, session) => {
  console.log(data, phone, session);
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${storeurl}Authentication/give_rating`,
        data,
        {
          headers: {
            Auth: session,
            Auth2: phone,
          },
        },
      );

      if (res.data.status) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);

      alert(err.message);
    }
  };
};
