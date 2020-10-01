import { combineReducers } from 'redux';
import jobs from './jobsReducer';
import tradesPeople from './tradesPeopleReducer';

const reducers = combineReducers({
  jobs,
  tradesPeople,
});

export default reducers;
