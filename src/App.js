import React from 'react';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/ConfigureStore';
import Main from './components/MainComponent';
import './App.css';

//starts redux store
const store = ConfigureStore();
/* Renders Main Component wrapped by redux store */
function App() {
  return (
    <Provider store={store}>
      <div className="App container-fluid px-0">
        <Main />
      </div>
    </Provider>
  );
}

export default App;
