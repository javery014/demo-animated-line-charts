import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useSpring, animated } from 'react-spring';
import Tag from '../components/Tag';
import triangle from '../assets/triangle.svg';
import { IMetricChartData } from '../types';;

type IMetricProps = {
  label: string;
  dataPoints: IMetricChartData;
  timing: number;
  playAnimation: boolean;
}

const useStyles = createUseStyles({
  container: {
    height: '50%',
    width: '57%',
    maxWidth: '15rem',
    maxHeight: '6.6rem',
    background: '#32325D',
    color: '#FFF',
    position: 'absolute',
    borderRadius: '5px',
    zIndex: 1,
    top: 0,
    left: 0,
    padding: '1.1rem'
  },
  value: {
    fontSize: '2rem',
    fontWeight: 700,
    marginLeft: '.75rem'
  },
  valueContainer: {
    display: 'flex',
    marginTop: '.5rem'
  },
  name: {
    color: '#EAEAEE',
    fontSize: '1rem'
  }
});

/**
 * Formatting function. It formats numeric values through the millions, and
 * then has a special case for Compute Time to count time
 * @param label Quick way to determine how the value should be formatted
 * @param value Value to be formatted
 * @returns formatted string
 */
function formatValue(label: string, value: number): string {
  const floored = Math.floor(value);

  if (label === 'Compute time') {
    const days = Math.floor(value / (60 * 24));
    const hours = Math.floor((value - days * (60 * 24)) / 60);
    return `${days}d ${hours}h`;
  } else {
    if (floored === 0) {
      return '----';
    } else if (floored < 1000000) {
      return floored
        .toString()
        .split('')
        .reduce((str, ch, i, a) => {
          return (a.length - (i + 1)) % 3 === 0 && i < a.length - 1 ? `${str}${ch},` : `${str}${ch}`;
        }, '');
    } else {
      return `${(floored / 1000000).toFixed(2)} M`;
    }
  }
}

const MetricCurrent: React.FunctionComponent<IMetricProps> = ({ label, dataPoints, timing, playAnimation }) => {
  const styles = useStyles();
  const current = Math.max(...dataPoints.map(dataPoint => dataPoint.value));
  const spring = useSpring(() => ({
    config: { duration: timing },
    current: 0,
    from: { current: 0 }
  }));

  useEffect(() => {
    if (playAnimation) {
      spring[1]({ current });
    }
  }, [playAnimation, spring, current]);

  return (
    <div className={styles.container}>
      <Tag className={styles.name}>{label}</Tag>
      <div className={styles.valueContainer}>
        <img src={triangle} alt="" />
        <span className={styles.value}>
          <animated.span className={styles.value}>
            {spring[0].current.interpolate((x) => formatValue(label, x))}
          </animated.span>
        </span>
      </div>
    </div>
  );
};

export default MetricCurrent;
