// import config from '../../../utils/developer/config';

// export const apiMiddleware = store => next => action => {
//   const { token } = store.getState().auth;
//   if (!action.request || !action.request.url) {
//     return next(action);
//   }
//   action.request.url = config.baseURL + action.request.url;
//   if (!action.request.hasOwnProperty('headers')) {
//     action.request.headers = {};
//   }
//   action.request.headers.Authorization = token;
//   next(action);
// };
