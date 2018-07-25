import { getUserInfoViaFB, createUser, getDaily, getUserInfo, updateDailyAPI, incrementStreak } from '../services/apiServices';
// import MarkCard from '../models/markCardModel';
// import { startLoading, stopLoading } from './loadingActions';

export const types = {
  UPDATE_TOKEN: 'UPDATE_TOKEN',
  UPDATE_CONTACTS: 'UPDATE_CONTACTS',
  UPDATE_USER_INFO: 'UPDATE_USER_INFO',
  UPDATE_FB_INFO: 'UPDATE_FB_INFO',
  UPDATE_DAILY_INFO: 'UPDATE_DAILY_INFO',
};

export function updateToken(token) {
  return {
    type: types.UPDATE_TOKEN,
    payload: token,
  };
}

export function updateContacts(contacts) {
  console.log('CONTACTS');
  return {
    type: types.UPDATE_CONTACTS,
    payload: contacts,
  };
}

export function updateUserInfo(userInfo) {
  return {
    type: types.UPDATE_USER_INFO,
    payload: userInfo,
  };
}

export function updateFBInfo(fbInfo) {
  return {
    type: types.UPDATE_FB_INFO,
    payload: fbInfo,
  };
}

export function updateDailyInfo(dailyInfo) {
  return {
    type: types.UPDATE_DAILY_INFO,
    payload: dailyInfo,
  };
}

export function storeUser(fbData) {
  // return updateUserInfo(fbData);
  return (dispatch) => {
    dispatch(updateFBInfo(fbData));
    getUserInfoViaFB(fbData.id)
      .then((data) => {
        console.log(data)
        if (data.length === 0) {
          createUser(fbData).then((newUser) => {
            dispatch(updateUserInfo(newUser));
          });
        } else {
          dispatch(updateUserInfo(data));
        }
        getDaily(data._id).then((dailyData) => {
          dispatch(updateDailyInfo(dailyData));
        });
      })
      .catch(err => console.log(err));
  };
}

export function updateUser(id) {
  return (dispatch) => {
    getUserInfo(id).then((userData) => {
      dispatch(updateUserInfo(userData));
    });
    getDaily(id).then((dailyData) => {
      dispatch(updateDailyInfo(dailyData));
    });
  };
}

export function updateDaily(id, message, givenName, imagePath, callbackAction) {
  return (dispatch) => {
    updateDailyAPI(id, message, givenName, imagePath).then(() => {
      incrementStreak(id).then(() => {
        dispatch(callbackAction);
      });
    });
  };
}
