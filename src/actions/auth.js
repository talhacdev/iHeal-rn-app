import {storeurl} from '../config/config';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
export const checkVersion = (data, rsl, rej) => {
  return (dispatch) => {
    axios(`${storeurl}/Authentication/UpdateVersion`, {
      method: 'post',
      data,
    }).then((res) => {
      if (
        res.data.status == false &&
        res.data.data !== undefined &&
        res.data.data.length > 1
      ) {
        rsl(res.data.data);
      }
    });
  };
};
export const signin = (phone, password, rsl, rej) => {
  return async (dispatch) => {
    const data = new FormData();
    data.append('phone_no', phone);
    data.append('password', password);
    axios(`${storeurl}/Authentication/login_user`, {
      method: 'post',
      data,
    })
      .then((res) => {
        if (
          res.data.status == true &&
          res.data.data !== undefined &&
          res.data.data.u_id !== undefined
        ) {
          if (res.data.data.user_privilidge == 0) {
            dispatch({
              type: 'PROFILE',
              user: res.data.data,
            });
            rsl(res.data.data);
          } else {
            rej({});
          }
        } else if (
          res.data.status == false &&
          res.data.message == 'Invalid Session or Phone no.'
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

export const logout = () => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: 'PROFILE',
      });
    }, 1000);
  };
};
export const removeBlock = () => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_BLOCK',
      });
    }, 1000);
  };
};
export const fcmToken = (data) => {
  console.log(data);
  return async (dispatch) => {
    const res = await axios(`${storeurl}/Authentication/updatetoken`, {
      method: 'post',
      data,
    });
    console.log(res);
  };
};
export const signInWithPhone = (phone, rsl, rej) => {
  return (dispatch) => {
    auth()
      .signInWithPhoneNumber(phone)
      .then((confirmResult) => {
        rsl(confirmResult);
      })
      .catch((error) => {
        rej(error.message);
      });
  };
};
export const authState = (rsl, rej) => {
  return (dispatch) => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        rsl(user);
        try {
          auth().signOut();
        } catch {}
      }
    });
  };
};
export const confirmOTP = (otp, confirmation, rsl, rej) => {
  return (dispatch) => {
    confirmation.confirm(otp).catch((error) => {
      rej(error.message);
    });
  };
};

//get categs
export const getCategList = (data) => {
  console.log(data);
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${'https://ranaentp.net/khadim/'}Authentication/category_wid_subcat`,
        data,
      );
      // return res;
      console.log(res);
      if (res.data.status) {
        const data1 = res.data.data.map((item) => {
          return {
            title: item.name,
            data: item.sub_cat.map((elem) => {
              console.log(elem);
              return {
                ...elem,
                checked: false,
              };
            }),
          };
        });

        const data =
          res.data.data &&
          res.data.data.map((item) => {
            return {title: item.name, data: item.sub_cat};
          });
        dispatch({
          type: 'GET_CATEG_LIST',
          categ: data1,
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
// export const signup = (phone, password, rsl, rej) => {
//   return dispatch => {
//     const data = new FormData();
//     data.append('phone_no', phone);
//     data.append('password', password);
//     axios(`${storeurl}/Authentication/signup_vendor`, {
//       method: 'post',
//       data,
//     })
//       .then(res => {
//         alert(JSON.stringify(res));
//         if (
//           res.data.status == true &&
//           res.data.data !== undefined &&
//           res.data.data.u_id !== undefined
//         ) {
//           if (res.data.data.user_privilidge == 0) {
//             dispatch({
//               type: 'PROFILE',
//               user: res.data.data,
//             });
//             rsl(res);
//           } else {
//             rej('You have been blocked\nPlease contact our customer support');
//           }
//         } else if (
//           res.data.status == false &&
//           res.data.message == 'Invalid Session or Phone no.'
//         ) {
//           dispatch({
//             type: 'SESSION',
//           });
//         } else {
//           rej(res.data.message);
//         }
//       })
//       .catch(err => {
//         rej(err.message);
//       });
//   };
// };

export const signup = (phone, password, rsl, rej) => {
  return (dispatch) => {
    const formData = new FormData();
    formData.append('phone_no', phone);

    formData.append('password', password);

    console.log(formData);
    axios(`${storeurl}/Authentication/signup_driver`, {
      method: 'post',
      data: formData,
    })
      .then((res) => {
        if (
          res.data.status == true &&
          res.data.data !== undefined &&
          res.data.data[0].u_id
        ) {
          dispatch({
            type: 'SIGNUP',
            user: res.data.data[0],
          });
          rsl(res);
        } else {
          rej(res.data.message);
        }
      })
      .catch((err) => rej(err.message));
  };
};
export const uploadCategList = (data, phone, session) => {
  console.log(data, phone, session);
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${'https://ranaentp.net/khadim/'}Authentication/insertvendorcat`,
        data,
        {
          headers: {
            Auth: session,
            Auth2: phone,
          },
        },
      );

      if (res.data.status) {
        console.log('zaid sahab ye lo', res.data);
        return res.data;
      } else {
        alert(res.data.message);
        return res.data;
      }
    } catch (err) {
      console.log(err);

      alert(err.message);
    }
  };
};
