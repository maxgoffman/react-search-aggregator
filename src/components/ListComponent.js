import React from 'react';
import { Loading } from './controls/loadplaceholder/LoadingComponent';


/** 
  * @desc List Component:
  * Displays a list of cards. 
  * Tried to keep code simple and effective
  * @author Maximiliano Goffman
  * @required bootstrap 4
*/
function ListComponent(props) {
    //render list
    return (
        <React.Fragment>
            {
                props.loading &&
                <Loading /> 
            }
            {
                props.error && 
                <p data-testid="errortext">There was a problem loading {props.source} list. Please try again or check your Internet connection.</p>
            }
            {
                props.list && 
                <ListItems {...props} />
            }
        </React.Fragment>
    );
}

const ListItems = (props) => {
    const items = props.list.map(
        (item) => (
            <div data-testid="listcards" key={item.link} className="border-top-0 border-left-0 border-right-0 py-1 card">
                <a href={item.link}>
                    <div className="card-title" dangerouslySetInnerHTML={{__html: item.title}} />
                </a>
                <div className="card-text" dangerouslySetInnerHTML={{__html: item.description}} />
            </div>
        )
    );
    return (
        <React.Fragment>
            <h2 className="mb-0">{props.source} List</h2>
            <hr />
            {items}
        </React.Fragment>
    );
};

export default ListComponent;