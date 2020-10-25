import {Google} from './Google';
import * as types from '../ActionTypes';
import {readFileSync} from 'fs';
import {resolve} from 'path';

/** 
  * @desc Unit Test google reducer
  * @author Maximiliano Goffman
*/
describe('Google Reducer', () => {
  
  it('should return a state with a fetched list formatted correctly', () => {
    const responseJsonString = readFileSync(resolve('./src/redux/google/searchtest.json')).toString();
    const responseGoogle = JSON.parse(responseJsonString);
    const initialState = { 
      errMess: null, 
      isLoading: true, 
      list: null
    }
    const expectedState = { 
      errMess: null, 
      isLoading: false, 
      list: responseGoogle.items.map((item) => ({
        title: item.htmlTitle,
        link: item.link,
        description: item.htmlSnippet
      }))
    }
    const expectedAction = {
      type: types.GOOGLE_FETCHED_DATA,
      list: responseGoogle.items,
    }
    expect(Google(initialState, expectedAction)).toEqual(expectedState)
  })
  it('should return a state with isLoading equaling true', () => {
    const initialState = { 
      errMess: null, 
      isLoading: false, 
      list: null,
    }
    const expectedState = { 
      errMess: null, 
      isLoading: true, 
      list: null,
    }
    const expectedAction = {
      type: types.GOOGLE_BEGIN_FETCH,
    }
    expect(Google(initialState, expectedAction)).toEqual(expectedState)
  })
  it('should return a state with an error message', () => {
    const errorMsg = "Lorem Ipsum Dolorem...";
    const initialState = { 
      errMess: errorMsg, 
      isLoading: false, 
      list: null
    }
    const expectedState = { 
      errMess: errorMsg, 
      isLoading: false, 
      list: null,
    }
    
    const expectedAction = {
      type: types.GOOGLE_ERROR_FETCH,
      error: errorMsg
    }
    expect(Google(initialState, expectedAction)).toEqual(expectedState)
  })
})
