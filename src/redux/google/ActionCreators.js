import * as ActionTypes from './ActionTypes';
import * as Credentials from './Credentials';

/** 
  * @desc Get List from google:
  * Fetch data from google and then send response to Redux Store.
  * @author Maximiliano Goffman
  * @required redux redux-thunk
*/
export const getList = (q) => async (dispatch) => {
  dispatch(initFetch());

  const googleUrl = `https://www.googleapis.com/customsearch/v1?key=${Credentials.googleKey}&cx=${Credentials.googleCX}&q=${q}`;
  try {
    const response = await fetch(googleUrl);
    if (!response.ok) {
      let error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;
    }
    const google = await response.json();
    if (google.items) {
      dispatch(fetchSuccess(google.items));
    }
    else {
      dispatch(fetchSuccess([]));
    }
  } catch(error) {
    dispatch(fetchFailed(error.message));
  }
};

/* Used to dispatch the beginning of the asynchronous action */
export const initFetch = () => ({
  type: ActionTypes.GOOGLE_BEGIN_FETCH
});

/* Success, return the list of items */
export const fetchSuccess = (list) => ({
  type: ActionTypes.GOOGLE_FETCHED_DATA,
  list: list
});

/* Failed, return an error message */
export const fetchFailed = (errmess) => ({
  type: ActionTypes.GOOGLE_ERROR_FETCH,
  error: errmess
});
