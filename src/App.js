import React from 'react';
import './App.css';
import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import Prices from './components/Prices';

function App() {
  return (
    <div className="App">
      <Prices text='My Text' />
      <ReduxToastr
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        preventDuplicates={true}
        timeOut={99999}
      />
    </div>
  );
}

export default App;
