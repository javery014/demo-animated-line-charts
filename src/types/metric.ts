export type IMetricMappedDataPoint = {
  x: number;
  y: number;
}

export type IMetricChartDataPoint = {
  time: number;
  value: number;
}

export type IMetricOppositeLine = {
  length: number;
  angle: number;
}

export type IMetricChartData = IMetricChartDataPoint[];
