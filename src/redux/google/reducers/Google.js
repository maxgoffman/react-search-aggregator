import * as ActionTypes from '../ActionTypes';

const initialState = { 
  errMess: null, 
  isLoading: false, 
  list: null,
};

/** 
  * @desc Google Reducer:
  * Handles all about Google model. 
  * @author Maximiliano Goffman
  * @required redux
*/
export const Google = (state = initialState, action) => {
    switch (action.type) {
      case ActionTypes.GOOGLE_BEGIN_FETCH:
        return {...state, isLoading: true, errMess: null};
      
      case ActionTypes.GOOGLE_FETCHED_DATA:
        return {
          ...state, 
          isLoading: false, 
          errMess: null, 
          list: action.list.map((item) => ({
            title: item.htmlTitle,
            link: item.link,
            description: item.htmlSnippet
          }))
        };

      case ActionTypes.GOOGLE_ERROR_FETCH:
          return {...state, isLoading: false, errMess: action.error, list: null};
      
      default:
        return state;
    }
};