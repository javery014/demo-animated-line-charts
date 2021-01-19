import React from 'react';
import { createUseStyles } from 'react-jss';
import Metric from './Metric';
import metricsData from '../data/metrics.json';

const useStyles = createUseStyles({
  metrics: {
    maxWidth: '100rem',
    margin: '5rem auto 0',
    display: 'flex',
    flexWrap: 'wrap',
    ['@media(min-width: 550px)']: {
      justifyContent: 'space-around'
    },
    ['@media(min-width: 920px)']: {
      justifyContent: 'space-between'
    }
  }
});

const Metrics: React.FunctionComponent = () => {
  const styles = useStyles();
  const lineColors = ['#A1CE08', '#FABC00', '#F6572C'];

  return (
    <div className={styles.metrics}>
      <Metric label="ML Projects" dataPoints={metricsData.projects} key={0} lineColor={lineColors[0]} />
      <Metric label="Data Samples" dataPoints={metricsData.data} key={1} lineColor={lineColors[1]} />
      <Metric label="Cloud Jobs" dataPoints={metricsData.jobs} key={2} lineColor={lineColors[2]} />
    </div>
  );
};

export default Metrics;
