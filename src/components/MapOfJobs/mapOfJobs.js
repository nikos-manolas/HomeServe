import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadJobs } from '../../actions/jobsActions';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';
import styles from './mapOfJobs.module.css';

const MapOfJobs = () => {
  const jobsFound = useSelector(state => state.jobs.jobsFound);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadJobs());
  }, [dispatch]);

  return (
    <div className = {styles.Jobs}>
      <Map center={[51.5, -0.3817833]} zoom={8} width={600} height={400}>
      { 
        jobsFound && jobsFound.length 
        ? jobsFound.map(job => {
          const { location: { coordinates }, jobId } = job;
          return <Marker key = {jobId} anchor={coordinates} payload={1} onClick={({ event, anchor, payload }) => {}} />
        })
        : null
      }
    </Map>
    </div>
  )
};

export default MapOfJobs;
