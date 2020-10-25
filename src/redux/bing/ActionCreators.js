import * as ActionTypes from './ActionTypes';
import * as Credentials from './Credentials';

/** 
  * @desc Get List from bing:
  * Fetch data from bing and then send response to Redux Store.
  * @author Maximiliano Goffman
  * @required redux redux-thunk
*/
export const getList = (q) => async (dispatch) => {
  dispatch(initFetch());

  const bingUrl = `https://api.cognitive.microsoft.com/bing/v7.0/search?q=${q}`;
  try {
    const response = await fetch(bingUrl, {
      method: "GET",
      headers: {
        'Ocp-Apim-Subscription-Key': Credentials.bingKey
      }
    });
    if (!response.ok) {
      let error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;
    }
    const bing = await response.json();
    if (bing.webPages) {
      dispatch(fetchSuccess(bing.webPages.value));
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
  type: ActionTypes.BING_BEGIN_FETCH
});

/* Success, return the list of items */
export const fetchSuccess = (list) => ({
  type: ActionTypes.BING_FETCHED_DATA,
  list: list
});

/* Failed, return an error message */
export const fetchFailed = (errmess) => ({
  type: ActionTypes.BING_ERROR_FETCH,
  error: errmess
});
