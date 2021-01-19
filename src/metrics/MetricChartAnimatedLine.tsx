import React, { useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { ISetPlayAnimation } from '../types';

type IMetricChartAnimatedLineProps = {
  path: string;
  length: number;
  timing: number;
  lineColor: string;
  playAnimation: boolean;
  setPlayAnimation: ISetPlayAnimation;
}

const MetricChartAnimatedLine: React.FunctionComponent<IMetricChartAnimatedLineProps> = ({
  path,
  length,
  timing,
  lineColor,
  playAnimation,
  setPlayAnimation
}) => {
  const spring = useSpring(() => ({
    config: { duration: timing },
    value: length,
    from: { value: length }
  }));

  useEffect(() => {
    // MetricChartAnimatedLine will decide when to play the animation once
    // the metric is in view. This is because it finishes rendering after
    // MetricCurrent (since MetricChartAnimatedLine isn't rendered until
    // MetricChart calculates the length of the dummy path),
    // and we want these animations to be in sync.
    setPlayAnimation(true);
  }, []);

  useEffect(() => {
    if (playAnimation) {
      spring[1]({ value: 1 });
    }
  }, [playAnimation]);

  return (
    <>
      <animated.path
        fill="none"
        stroke={lineColor}
        strokeWidth="2"
        strokeDashoffset={spring[0].value}
        strokeDasharray={length}
        d={path}
        style={{ willChange: 'stroke-dashoffset', transform: 'translate3d(0, 0, 0)' }}
      />
      <animated.path
        fill="none"
        stroke={lineColor}
        strokeWidth="10"
        strokeDashoffset={spring[0].value}
        strokeLinecap="round"
        strokeDasharray={`0 ${length}`}
        d={path}
        style={{ willChange: 'stroke-dashoffset', transform: 'translate3d(0, 0, 0)' }}
      />
    </>
  );
};

export default MetricChartAnimatedLine;
