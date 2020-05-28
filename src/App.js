import React from 'react';
import {Route} from 'react-router-dom';
import HomePage from './components/pages/HomePage'
import BattleDetailsPage from  './components/pages/BattleDetailsPage';
import SearchBattlePage from './components/pages/SearchBattlePage'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const App =({location}) => {

  return (
      <div>
          <div>
            <Route path="/" location={location} exact  component={HomePage}/>
            <Route path="/search/:token" location={location} exact component={SearchBattlePage}/>
            <Route path="/battleDetail/:token" location={location} exact component={BattleDetailsPage}/>
          </div>

      </div>
  )
}
App.propTypes ={
    location:PropTypes.shape({
        pathname:PropTypes.string.isRequired
    }).isRequired,

};

export default App;
