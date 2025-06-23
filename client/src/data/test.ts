// Sample test data for charts (Einspeisung vs Bezug, consumption, and meter readings)

export interface DataPoint {
  ts: string;    // Unix timestamp as string
  value: number; // kWh
}

export interface DataResponse {
  sensorId: string;
  data: DataPoint[];
}

// Timestamps for one week starting June 16, 2025 (UTC)
const WEEKLY_TS = [
  1750032000, // 2025-06-16
  1750118400, // 2025-06-17
  1750204800, // 2025-06-18
  1750291200, // 2025-06-19
  1750377600, // 2025-06-20
  1750464000, // 2025-06-21
  1750550400, // 2025-06-22
];

export const testFeedInData: DataResponse = {
  sensorId: 'ID735', // Einspeisung
  data: WEEKLY_TS.map((ts, i) => ({
    ts: ts.toString(),
    value: [10, 12, 15, 13, 14, 16, 18][i],
  })),
};

export const testDrawData: DataResponse = {
  sensorId: 'ID742', // Bezug
  data: WEEKLY_TS.map((ts, i) => ({
    ts: ts.toString(),
    value: [8, 9, 11, 10, 12, 10, 9][i],
  })),
};

// For consumption chart (daily usage)
export const testConsumptionData: DataResponse = {
  sensorId: 'ID742', // consumption sensor
  data: WEEKLY_TS.map((ts, i) => ({
    ts: ts.toString(),
    value: [5, 6, 4, 7, 5, 6, 5][i],
  })),
};

// For meter reading chart (cumulative)
export const testMeterData: DataResponse = {
  sensorId: 'ID735', // meter sensor
  data: WEEKLY_TS.map((ts, i) => ({
    ts: ts.toString(),
    value: [12300, 12305, 12311, 12315, 12322, 12328, 12333][i],
  })),
};
