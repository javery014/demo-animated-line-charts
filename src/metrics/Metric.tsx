import React, { useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { FixedAspectRatioContainer, FixedAspectRatioElement } from '../components/FixedAspectRatioElement';
import MetricCurrent from './MetricCurrent';
import MetricChart from './MetricChart';
import { IMetricChartData } from '../types';;

type IMetricProps = {
  label: string;
  dataPoints: IMetricChartData;
  lineColor: string;
}

const useStyles = createUseStyles({
  root: {
    width: '100%',
    '@media(max-width: 549px)': {
      '& + &': {
        margin: '5rem 0 0 0'
      }
    },
    '@media(min-width: 550px) and (max-width: 919px)': {
      '&:nth-child(3)': {
        margin: '5rem 0 0 0'
      }
    },
    '@media(min-width: 550px)': {
      width: '45%'
    },
    '@media(min-width: 920px)': {
      margin: 0,
      width: '25.4rem'
    }
  },
  inner: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'relative',
    flexDirection: 'column'
  }
});

const Metric: React.FunctionComponent<IMetricProps> = ({ label, dataPoints, lineColor }) => {
  const styles = useStyles();
  const metricRef = useRef(null);

  return (
    <div ref={metricRef} className={styles.root}>
      <FixedAspectRatioContainer ratio="57%">
        <FixedAspectRatioElement el="div" className={styles.inner}>
          <MetricCurrent label={label} dataPoints={dataPoints} />
          <MetricChart
            dataPoints={dataPoints}
            lineColor={lineColor}
          />
        </FixedAspectRatioElement>
      </FixedAspectRatioContainer>
    </div>
  );
};

export default Metric;
