import {Bing} from './Bing';
import * as types from '../ActionTypes';
import {readFileSync} from 'fs';
import {resolve} from 'path';

/** 
  * @desc Unit Test bing actions
  * @author Maximiliano Goffman
*/
describe('Bing Reducer', () => {
  
  it('should return a state with a fetched list formatted correctly', () => {
    const responseJsonString = readFileSync(resolve('./src/redux/bing/searchtest.json')).toString();
    const responseBing = JSON.parse(responseJsonString);
    const initialState = { 
      errMess: null, 
      isLoading: true, 
      list: null
    }
    const expectedState = { 
      errMess: null, 
      isLoading: false, 
      list: responseBing.webPages.value.map((item) => ({
        title: item.name,
        link: item.url,
        description: item.snippet
      }))
    }
    const expectedAction = {
      type: types.BING_FETCHED_DATA,
      list: responseBing.webPages.value,
    }
    expect(Bing(initialState, expectedAction)).toEqual(expectedState)
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
      type: types.BING_BEGIN_FETCH,
    }
    expect(Bing(initialState, expectedAction)).toEqual(expectedState)
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
      type: types.BING_ERROR_FETCH,
      error: errorMsg
    }
    expect(Bing(initialState, expectedAction)).toEqual(expectedState)
  })
})
