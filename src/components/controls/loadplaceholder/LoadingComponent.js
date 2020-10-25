import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';

/** 
  * @desc Loading component:
  * Adds a placeholder while we're loading data.
  * @author Maximiliano Goffman
*/
export const Loading = () => {
    return(
        <div className={`col-12 text-center align-baseline`}>
            <FontAwesomeIcon data-testid="fontAwesomeLoadingIcon" icon={faSpinner} pulse size="3x"  className="fa-fw" />
        </div>
    );
};