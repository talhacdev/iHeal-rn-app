import {storeurl} from '../config/config';
import axios from 'axios';

export const getUserData = (data) => {
  return (dispatch) => {
    axios(`${storeurl}/Authentication/get_user_data`, {
      method: 'post',
      data,
    }).then((res) => {
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
        } else {
          dispatch({
            type: 'Block',
          });
        }
      } else if (
        res.data.status == false &&
        res.data.message == 'Invalid Session or Mobile no.'
      ) {
        dispatch({
          type: 'SESSION',
        });
      }
    });
  };
};
export const updateProfile = (data, rsl, rej) => {
  return (dispatch) => {
    axios(`${storeurl}/Authentication/update_profile`, {
      method: 'post',
      data,
    })
      .then((res) => {
        if (res.data.status == true && res.data.data.u_id !== undefined) {
          dispatch({
            type: 'PROFILE',
            user: res.data.data,
          });
          rsl();
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
      .catch((err) => {
        rej(err.message);
      });
  };
};
export const updatePassword = (data, rsl, rej) => {
  return (dispatch) => {
    axios(`${storeurl}/Authentication/update_vendor_password`, {
      method: 'post',
      data,
    })
      .then((res) => {
        if (res.data.status == true) {
          rsl();
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
      .catch((err) => {
        rej(err.message);
      });
  };
};
