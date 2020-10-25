import * as ActionTypes from '../ActionTypes';

const initialState = { 
  errMess: null, 
  isLoading: false, 
  list: null,
};

/** 
  * @desc Bing Reducer:
  * Handles all about Bing model. 
  * @author Maximiliano Goffman
  * @required redux
*/
export const Bing = (state = initialState, action) => {
    switch (action.type) {
      case ActionTypes.BING_BEGIN_FETCH:
        return {...state, isLoading: true, errMess: null};
      
      case ActionTypes.BING_FETCHED_DATA:
        return {
          ...state, 
          isLoading: false, 
          errMess: null, 
          list: action.list.map((item) => ({
            title: item.name,
            link: item.url,
            description: item.snippet
          }))
        };

      case ActionTypes.BING_ERROR_FETCH:
          return {...state, isLoading: false, errMess: action.error, list: null};
      
      default:
        return state;
    }
};