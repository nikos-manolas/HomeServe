import React from 'react';
import MapOfJobs from '../MapOfJobs/mapOfJobs';

const Home = () => {
  return (
    <React.Fragment>
      <h2>
        Available jobs for all tradespeople
      </h2>
      <MapOfJobs/>
    </React.Fragment>
  );
}

export default Home;
