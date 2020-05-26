import {combineReducers} from 'redux';

import config from './reducers/config_reducer';
import battleData from './reducers/battleData'
//import devices from './reduces/devices'

export default combineReducers({
    //  user,
    // devices
    battleData,
    config
})