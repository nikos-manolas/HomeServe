export const LOAD_JOBS = 'LOAD_JOBS';

export const loadJobs = () => {
  return async dispatch => {
    const response = await fetch(`http://localhost:4000/jobs/available`);
    const jobs = await response.json();
    return dispatch(setJobs(jobs));
  };
};

export const SET_JOBS = 'SET_JOBS';
export const setJobs = (jobs) => {
  return {
    type: SET_JOBS,
    jobs
  };
};

export const CREATE_JOB = 'CREATE_JOB';
export const createJob = (job) => {
  return async dispatch => {
    const response = await fetch(`http://localhost:4000/jobs`,
      {
        method: 'POST',
        body: JSON.stringify(job),
        headers: { 'Content-Type': 'application/json' }
      });
    const jobCreated = await response.json();
    return { jobCreated };
  };
};
