// todo: add config here
// default speed params, local storage keys, etc
// todo: add default values: km/h or m/s. All units should be the same (e.g., metres, sec, m/sec)

export const raceSettings = {
  walking: {
    minSpeed: 3,
    maxSpeed: 7.5,
    maximumTimeBetweenPointsSecs: 30
  },
  running: {
    minSpeed: 7.5,
    maxSpeed: 20,
    maximumTimeBetweenPointsSecs: 30
  },
  cycling: {
    minSpeed: 7.5,
    maxSpeed: 50,
    maximumTimeBetweenPointsSecs: 30
  }
};

export const delayBetweenGeoCalls = 10;
export const minimumDistanceDiffBetweenPositions = 10;