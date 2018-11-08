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
