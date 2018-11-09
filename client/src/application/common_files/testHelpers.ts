import { Race } from "./interfaces";

interface PositionOptions {
  readonly latitude: number;
  readonly longitude: number;
  readonly timestamp: number;
}

type GetTestPosition = (options: PositionOptions) => Position;

export const getTestPosition: GetTestPosition = options => ({
  coords: {
    accuracy: 1,
    altitude: 2,
    altitudeAccuracy: 1,
    heading: 20,
    speed: 27,
    latitude: options.latitude,
    longitude: options.longitude
  },
  timestamp: options.timestamp
});

type GetTestRaces = () => ReadonlyArray<Race>;

export const getTestRaces: GetTestRaces = () => [
  {
    type: "running",
    path: [
      { latitude: 44, longitude: 44, time: 117 },
      { latitude: 44.002, longitude: 44.002, time: 222 }
    ]
  },
  {
    type: "walking",
    path: [
      { latitude: 44.002, longitude: 44.002, time: 222 },
      { latitude: 44.005, longitude: 44.002, time: 444 }
    ]
  },
  {
    type: "cycling",
    path: [
      { latitude: 44.005, longitude: 44.002, time: 444 },
      { latitude: 44.007, longitude: 44.007, time: 666 }
    ]
  }
];
