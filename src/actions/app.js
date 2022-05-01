import axios from 'axios';
import {ActionSheetIOS} from 'react-native';
import Messages from '../components/Messages/Messages';
import {storeurl} from '../config/config';

//get categs
export const getCategories = (data) => {
  console.log(data);
  return async (dispatch) => {
    try {
      const res = await axios.post(`${storeurl}Authentication/category`, data);
      // return res;
      console.log(res);
      if (res.data.status) {
        dispatch({
          type: 'GET_CATEGORIES',
          categ: res.data.data,
        });
        return res;
      } else {
        return res;
      }
    } catch (err) {
      console.log(err);

      alert(err.message);
    }
  };
};

//get subcategs
export const getSubCategories = (data) => {
  console.log(data);
  return async (dispatch) => {
    try {
      const res = await axios.post(`${storeurl}Authentication/category`, data);
      // return res;
      console.log(res);
      if (res.data.status) {
        dispatch({
          type: 'GET_SUB_CATEG',
          subCateg: res.data.data,
        });
        return res;
      } else {
        return res;
      }
    } catch (err) {
      console.log(err);

      alert(err.message);
    }
  };
};
//get subcategs
export const placeOrder = (data, phone, session) => {
  console.log(data, phone, session);
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${storeurl}Authentication/place_order`,
        data,
        {
          headers: {
            Auth: session,
            Auth2: phone,
          },
        },
      );
      return res;
    } catch (err) {
      console.log(err);

      alert(err.message);
    }
  };
};

//get subcategs
export const showPopup = (session, phone) => {
  console.log(phone, session);
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${storeurl}Authentication/show_popup`,
        null,
        {
          headers: {
            Auth: session,
            Auth2: phone,
          },
        },
      );

      if (res.data.status) {
        dispatch({
          type: 'POP_UP_DATE',
          popData: res.data.data,
        });
        return res;
      } else {
        dispatch({
          type: 'POP_UP_DATE',
          popData: res.data.data,
        });
        return res.data.status;
      }
    } catch (err) {
      console.log(err);

      alert(err.message);
    }
  };
};

export const giverating = (data, phone, session) => {
  console.log('DEBUG giverating: ', data, phone, session);
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

      console.log(JSON.stringify(res));
      if (res.data.status) {
        return res;
      } else {
        return res;
      }
    } catch (err) {
      console.log(err);

      alert(err.message);
    }
  };
};

export const sendLocation = (data, user, rsl, rej) => {
  console.log('user', user.session, user.phone_no);
  return (dispatch) => {
    try {
      axios
        .post(`${storeurl}Authentication/Updatelatlong`, data, {
          headers: {
            Auth: user && user.session,
            Auth2: user && user.phone_no,
          },
        })
        .then((res) => {
          console.log(res);
          rsl(res.data.status);
          return true;
        })
        .catch((err) => {
          rej(res.data.status);
          return false;
        });
    } catch (err) {
      console.log(err);
      rej(err.message);
      alert(err.message);
    }
  };
};

// export const showModal = (data) => {
//   return console.log(data);
//   return (dispatch) => {
//     try {
//       dispatch({
//         type: 'SHOW_MODAL',
//         show: data,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };
// }
export const acceptOrder = (data, user, rsl, rej) => {
  return (dispatch) => {
    try {
      const res = axios
        .post(`${storeurl}Authentication/accept_order`, data, {
          headers: {
            Auth: user && user.session,
            Auth2: user && user.phone_no,
          },
        })

        .then((res) => {
          console.log(res);
          rsl(res);
        })
        .catch((err) => {
          rej(err.message);
        });
    } catch (err) {
      console.log(err);
      rej(err.message);
    }
  };
};
export const sendMessage = (data, messages) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${storeurl}Authentication/SendMsg`, data, {
        // headers: {
        //   Auth: user && user.session,
        //   Auth2: user && user.phone_no,
        // },
      });
      console.log(res);
      // .then((res) => {
      //   dispatch({
      //     type: 'MESSAGES',
      //     message: [...messages, res.data.data],
      //   });
      //   rsl(res);
      // })
      // .catch((err) => {
      //   rej(err.message);
      // });
    } catch (err) {
      console.log(err);
      rej(err.message);
    }
  };
};

export const newMessages = (data, messages) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${storeurl}Authentication/get_new_msgs`,
        data,
        {},
      );
      console.log('===>', res.data.data);
      if (res.data.status) {
        let newMsgs = messages.concat(res.data.data);

        dispatch({
          type: 'MESSAGES',
          message: newMsgs?.sort(
            (a, b) => parseInt(a.msg_id) - parseInt(b.msg_id),
          ),
        });
      } else {
        dispatch({
          type: 'MESSAGES',
          message: messages,
        });
      }
    } catch (err) {
      console.log(err);
      rej(err.message);
    }
  };
};
export const getuserRatingBalance = (data, rsl, rej) => {
  return (dispatch) => {
    try {
      axios
        .post(`${storeurl}Authentication/get_rating_blnc`, data, {})

        .then((res) => {
          console.log(res.data.data);

          dispatch({
            type: 'USER_BAL_RAT',
            balance: res.data.data.blnc,
            totalrating: res.data.data.totalrating,
          });
          rsl(res);
        })
        .catch((err) => {
          console.log(err);

          rej(err.message);
        });
    } catch (err) {
      console.log(err);
      rej(err.message);
    }
  };
};
