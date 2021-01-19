import React from 'react';
import { createUseStyles } from 'react-jss';
import calculatePathSmooth from './smooth-path';
import graphHelper from './metric-chart-graph-helper';
import { IMetricChartData } from '../types';;

type IMetricChartProps = {
  dataPoints: IMetricChartData;
  lineColor: string;
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
  lineColor
}) => {
  const styles = useStyles();
  const gridLineYValues = graphHelper.getGridLineYValues();
  const xAxisStartLabel = graphHelper.getXAxisStartLabel(dataPoints);
  const svgPath = calculatePathSmooth(graphHelper.mapDataToSvgCoordinates(dataPoints));

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
        <path
          d={svgPath}
          fill="none"          
          stroke={lineColor}
          strokeWidth="2"
        />
      </svg>
      <div className={styles.xAxisLabels}>
        <span>{xAxisStartLabel}</span>
        <span>Today</span>
      </div>
    </>
  );
};

export default MetricChart;
