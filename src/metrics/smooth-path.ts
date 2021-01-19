import { IMetricMappedDataPoint, IMetricOppositeLine } from '../types';

function computeOppositeLine(pointA: IMetricMappedDataPoint, pointB: IMetricMappedDataPoint): IMetricOppositeLine {
  const lengthX = pointB.x - pointA.x;
  const lengthY = pointB.y - pointA.y;
  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX)
  };
}

function computeControlPoint(
  current: IMetricMappedDataPoint,
  previous: IMetricMappedDataPoint,
  next: IMetricMappedDataPoint,
  reverse: boolean
): number[] {
  // When 'current' is the first or last point of the array
  // 'previous' or 'next' don't exist.
  // Replace with 'current'
  const p = previous || current;
  const n = next || current; // The smoothing ratio
  const smoothing = 0.2; // Properties of the opposed-line
  const o = computeOppositeLine(p, n); // If is end-control-point, add PI to the angle to go backward
  const angle = o.angle + (reverse ? Math.PI : 0);
  const length = o.length * smoothing; // The control point position is relative to the current point
  const x = current.x + Math.cos(angle) * length;
  const y = current.y + Math.sin(angle) * length;
  return [x, y];
}

function computeBezierCommand(point: IMetricMappedDataPoint, i: number, a: IMetricMappedDataPoint[]): string {
  // start control point
  const [cpsX, cpsY] = computeControlPoint(a[i - 1], a[i - 2], point, false); // end control point
  const [cpeX, cpeY] = computeControlPoint(point, a[i - 1], a[i + 1], true);
  return `C ${cpsX} ${cpsY}, ${cpeX} ${cpeY}, ${point.x} ${point.y}`;
}

function calculatePathSmooth(dataPoints: IMetricMappedDataPoint[]): string {
  return dataPoints.reduce<string>((generated, dataPoint, i) => {
    if (i === 0) return generated;

    const bezier = computeBezierCommand(dataPoint, i, dataPoints);
    return `${generated} ${bezier}`;
  }, `M 0 ${dataPoints[0].y}`);
}

export default calculatePathSmooth;