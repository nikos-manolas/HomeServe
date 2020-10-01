import { SET_JOBS } from '../actions/jobsActions';
const initialState = {};

const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_JOBS:
      return { ...state, jobsFound: action.jobs.jobsFound }; 
    default:
      return state;
  }
};

export default jobsReducer;
