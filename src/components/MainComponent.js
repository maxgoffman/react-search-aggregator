import React, { useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getList as getGoogleList } from '../redux/google/ActionCreators';
import { getList as getBingList } from '../redux/bing/ActionCreators';
import ListComponent from './ListComponent';

/** 
  * @desc Main react component:
  * it'll handle initial data fetching
  * Using React.memo to avoid needless re renders
  * Added redux hooks useSelector and useDispatch
  * It allows to avoid mapStateToProps and
  * mapDispatchToProps
  * simplifying the Virtual Dom hierarchy because
  * that way Redux doesn't use the connect 
  * wrapping component.
  * @author Maximiliano Goffman
  * @required react react-redux ...
*/
const Main = React.memo( (props) => {
  const reduxProps = useSelector(state => ({
    googleList:state.Google.list,
    googleLoading:state.Google.isLoading,
    googleErrMess:state.Google.errMess,
    bingList:state.Bing.list,
    bingLoading:state.Bing.isLoading,
    BingErrMess:state.Bing.errMess
  }), shallowEqual);
  const dispatch = useDispatch();
  
  const [searchEngineSelected, updateSearchEngineSelected] = useState(null);
  const queryRef = useRef(null);
  const searchEngineRef = useRef(null);
  
  //Captures submit event and dispatches
  //actions for bing and/or google
  const handleSubmit = (event) => {
    event.preventDefault();
    const query = 
      queryRef.current && queryRef.current.value ? 
        queryRef.current.value : 
        '';
    const searchEngine = 
      searchEngineRef.current && searchEngineRef.current.value ?
        searchEngineRef.current.value :
        null;
    updateSearchEngineSelected(searchEngine);
    if (query !== '') {
      if (searchEngine === 'Both' || searchEngine ===  'Google') {
        dispatch(getGoogleList(query));
      }
      if (searchEngine === 'Both' || searchEngine === 'Bing') {
        dispatch(getBingList(query));
      }  
    }
  };

  //render main
  return (
      <React.Fragment>
        <div className="row">
          <div className="text-left m-1 col">
            <form onSubmit={handleSubmit}>
              <label htmlFor="query" className="d-block m-1">Please type in your search:</label>
              <input 
                type="text" 
                name="query" 
                ref={queryRef}
                className="d-block m-1"
                data-testid="queryInput"
              />
              <select 
                name="searchEngine"
                ref={searchEngineRef}
                className="d-block m-1"
                data-testid="selectInput"
              >
                <option value="Both">Both</option>
                <option value="Bing">Bing</option>
                <option value="Google">Google</option>
              </select>
              <button 
                type="submit"
                className="d-block"
                data-testid="submitButton"
              >
                Submit
              </button>
            </form>
          </div> 
        </div>
        {
          //using conditional rendering for this
          //if searchEngineSelected is not null
          //it means the user has triggered 
          //the search at least once
          searchEngineSelected &&
          <div className="row">    
              {
                (searchEngineSelected === 'Both' || searchEngineSelected === 'Google') &&
                <div className="col">
                  <ListComponent 
                    list={reduxProps.googleList} 
                    source="Google"
                    error={reduxProps.googleErrMess}
                    loading={reduxProps.googleLoading}
                  />
                </div>
              }
              {
                (searchEngineSelected === 'Both' || searchEngineSelected === 'Bing') &&
                <div className="col">
                  <ListComponent 
                    list={reduxProps.bingList} 
                    source="Bing"
                    error={reduxProps.bingErrMess}
                    loading={reduxProps.bingLoading}
                  />
                </div>
              }
          </div>
        }
      </React.Fragment>
    );
  });
  
  export default Main;