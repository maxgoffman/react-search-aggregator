import * as actions from './ActionCreators';
import * as types from './ActionTypes';
import {readFileSync} from 'fs';
import {resolve} from 'path';

/** 
  * @desc Unit Test google actions
  * @author Maximiliano Goffman
*/
describe('actions', () => {
  
  it('should return a function have a getList funcion', () => {
    expect(actions.getList()).toBeDefined()
  })
  it('should return a fetched data action', () => {
    const responseJsonString = readFileSync(resolve('./src/redux/google/searchtest.json')).toString();
    const responseGoogle = JSON.parse(responseJsonString);
    const expectedAction = {
      type: types.GOOGLE_FETCHED_DATA,
      list: responseGoogle.items,
    }
    expect(actions.fetchSuccess(responseGoogle.items)).toEqual(expectedAction)
  })
  it('should return a begin fetch action', () => {
    const expectedAction = {
      type: types.GOOGLE_BEGIN_FETCH,
    }
    expect(actions.initFetch()).toEqual(expectedAction)
  })
  it('should return an error fetch action', () => {
    const errMess = "Lorem Ipsum Dolorem...";
    const expectedAction = {
      type: types.GOOGLE_ERROR_FETCH,
      error: errMess
    }
    expect(actions.fetchFailed(errMess)).toEqual(expectedAction)
  })
})
