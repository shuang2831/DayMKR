import { getUserInfo, createUser } from '../services/apiServices';
// import MarkCard from '../models/markCardModel';
// import { startLoading, stopLoading } from './loadingActions';

export const types = {
  UPDATE_TOKEN: 'UPDATE_TOKEN',
  UPDATE_CONTACTS: 'UPDATE_CONTACTS',
  UPDATE_USER_INFO: 'UPDATE_USER_INFO',
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

export function storeUser(fbData) {
  return updateUserInfo(fbData);
  // return (dispatch) => {
  //   // dispatch(startLoading());
  //   getUserInfo(fbData.id)
  //     .then((data) => {
  //       if (data.length === 0) {
  //         // createUser(fbData);
  //       }
  //       dispatch(updateUserInfo(fbData));
  //     })
  //     .catch(err => console.log(err));
  // };
}

// export function getMarkCardsFromApi(locationData) {
//   return (dispatch) => {
//     dispatch(startLoading());
//     getMarkCards(locationData)
//       .then((data) => {
//         dispatch(stopLoading());
//         return data;
//       })
//       .then((data) => {
//         const markCards = data.message.map(markCard => MarkCard(markCard));
//         dispatch(getMarkCardSuccess(markCards));
//         console.log(data);
//         console.log(markCards);
//       })
//       .catch((err) => {
//         dispatch(stopLoading());
//         dispatch(getMarkCardFailed(markCards));
//         console.log(err);
//       });
//   };
// }
