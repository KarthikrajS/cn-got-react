import React from 'react';
import {Route} from 'react-router-dom';
import HomePage from './components/pages/HomePage'
import BattleDetailsPage from  './components/pages/BattleDetailsPage';

const App =() => {

  return (
      <div>
          <div>
            <Route path="/" exact component={HomePage}/>
            <Route path="/battleDetail" exact component={BattleDetailsPage}/>
          </div>

      </div>
  )
}

export default App;
