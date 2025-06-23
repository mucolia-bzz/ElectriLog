export interface DataPoint {
  ts: string;
  value: number;
}

export interface DataResponse {
  sensorId: string;
  data: DataPoint[];
}
