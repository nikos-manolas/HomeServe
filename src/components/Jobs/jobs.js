import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createJob } from '../../actions/jobsActions';
import styles from './jobs.module.css';

const Jobs = () => {
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longtitude, setLongtitude] = useState('');

  const dispatch = useDispatch();

  const handleChangeName = (event) =>  {
    setName(event.target.value);
  };

  const handleLatitudeChange = (event) =>  {
    setLatitude(event.target.value);
  };

  const handleLongtitudeChange = (event) =>  {
    setLongtitude(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createJob({name, location: { type: 'Point', coordinates: [Number(latitude), Number(longtitude)]}}));
    setName('');
    setLatitude('');
    setLongtitude('');
  };

  return (
    <div>
      <h2> Add a new job</h2>
      <form onSubmit={ handleSubmit }>
        <label className={styles.name}>
          Name:
          <input type="text" name="name" value={name} style={{ padding: '0.2rem'}} required onChange={handleChangeName}/>
        </label>
        <br />
        <label className={styles.location}>Location</label>
        <br />
        <div>
          <label style={{ marginRight: '1rem'}}>
            Latitude:
            <input type="text" name="latitude" value={latitude} style={{ padding: '0.2rem'}} required onChange={handleLatitudeChange}/>
          </label>
          <label>
            Longtitude:
            <input type="text" name="longtitude" value={longtitude} style={{ padding: '0.2rem'}} required onChange={handleLongtitudeChange}/>
          </label>
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Jobs;
