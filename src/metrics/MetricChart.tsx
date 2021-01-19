import React, { useRef, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import MetricChartAnimatedLine from './MetricChartAnimatedLine';
import calculatePathSmooth from './smooth-path';
import graphHelper from './metric-chart-graph-helper';
import { IMetricChartData, ISetPlayAnimation } from '../types';;

type IMetricChartProps = {
  dataPoints: IMetricChartData;
  lineColor: string;
  timing: number;
  playAnimation: boolean;
  setPlayAnimation: ISetPlayAnimation;
}

const useStyles = createUseStyles(() => ({
  xAxisLabels: {
    fontWeight: 'bold',
    fontSize: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    color: '#BBB',
    marginTop: '.5rem',
    height: '1.15rem'
  }
}));

const MetricChart: React.FunctionComponent<IMetricChartProps> = ({
  dataPoints,
  lineColor,
  timing,
  playAnimation,
  setPlayAnimation,
}) => {
  const styles = useStyles();
  const dummyPathEl = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState<number>(0);
  const gridLineYValues = graphHelper.getGridLineYValues();
  const xAxisStartLabel = graphHelper.getXAxisStartLabel(dataPoints);
  const svgPath = calculatePathSmooth(graphHelper.mapDataToSvgCoordinates(dataPoints));

  useEffect(() => {
    // get the length of the svg path
    if (svgPath && dummyPathEl?.current) {
      setPathLength(dummyPathEl.current.getTotalLength());
    }
  }, [svgPath]);

  return (
    <>
      <svg style={{ width: '100%' }} viewBox={`0 0 ${graphHelper.SVG_WIDTH} ${graphHelper.SVG_HEIGHT}`}>
        <line
          x1={graphHelper.GRID_AXIS_X[0]}
          x2={graphHelper.GRID_AXIS_X[1]}
          y1={gridLineYValues[0]}
          y2={gridLineYValues[0]}
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="1"
          strokeDasharray="3"
        />
        <line
          x1={graphHelper.GRID_AXIS_X[0]}
          x2={graphHelper.GRID_AXIS_X[1]}
          y1={gridLineYValues[1]}
          y2={gridLineYValues[1]}
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="1"
          strokeDasharray="3"
        />
        <line
          x1={graphHelper.GRID_AXIS_X[0]}
          x2={graphHelper.GRID_AXIS_X[1]}
          y1={gridLineYValues[2]}
          y2={gridLineYValues[2]}
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="1"
          strokeDasharray="3"
        />
        <line
          x1={graphHelper.GRID_AXIS_X[0]}
          x2={graphHelper.GRID_AXIS_X[1]}
          y1={gridLineYValues[3]}
          y2={gridLineYValues[3]}
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="1"
        />
        <path ref={dummyPathEl} d={svgPath} fill="none" stroke="none" />
        {pathLength && (
          <MetricChartAnimatedLine
            path={svgPath}
            length={pathLength}
            timing={timing}
            lineColor={lineColor}
            playAnimation={playAnimation}
            setPlayAnimation={setPlayAnimation}
          />
        )}
      </svg>
      <div className={styles.xAxisLabels}>
        <span>{xAxisStartLabel}</span>
        <span>Today</span>
      </div>
    </>
  );
};

export default MetricChart;
