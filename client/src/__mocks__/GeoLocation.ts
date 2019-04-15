export class GeoLocationMock implements Geolocation {
  public providedSuccessCallback: (position: Position) => void;
  public providedErrorCallback: PositionErrorCallback;
  public options: PositionOptions;
  public watchId: null | number = null;
  public watchPositionWasCalledTimes = 0;
  public clearWatchWasCalled = {
    status: false,
    providedWatchNumber: 0
  };
  public lastError?: PositionError;
  public getCurrentPosition: any;

  constructor() {
    this.options = {};
    this.providedSuccessCallback = () => undefined;
    this.providedErrorCallback = () => undefined;
  }

  public clearWatch(watchId: number) {
    this.providedErrorCallback = () => undefined;
    this.providedSuccessCallback = () => undefined;
    this.clearWatchWasCalled.status = true;
    this.clearWatchWasCalled.providedWatchNumber = watchId;
    this.watchId = null;
  }

  public watchPosition(
    successCallback: (position: Position) => void,
    errorCallback: PositionErrorCallback,
    options: PositionOptions
  ) {
    this.watchPositionWasCalledTimes++;
    this.providedSuccessCallback = successCallback;
    this.providedErrorCallback = errorCallback;
    this.options = options;
    this.watchId = Math.ceil(Math.random() * 1000);
    return this.watchId;
  }

  public sendPosition(position: Position) {
    this.providedSuccessCallback(position);
  }

  public sendError(error: string) {
    this.lastError = {
      code: 1,
      message: error,
      POSITION_UNAVAILABLE: 2,
      TIMEOUT: 23,
      PERMISSION_DENIED: 0
    };
    this.providedErrorCallback(this.lastError);
  }
}

export const simulateRace = (): Geolocation => {
  const geoLocationMock = new GeoLocationMock();
  setTimeout(() => {
    geoLocationMock.sendPosition({
      // @ts-ignore
      coords: { latitude: 48.4259232, longitude: 35.025148 },
      timestamp: new Date().getTime()
    });
  }, 1000);
  setTimeout(() => {
    geoLocationMock.sendPosition({
      // @ts-ignore
      coords: { latitude: 48.42252841, longitude: 35.05864354 },
      timestamp: new Date().getTime()
    });
  }, 11500);
  setTimeout(() => {
    geoLocationMock.sendPosition({
      // @ts-ignore
      coords: { latitude: 48.4226755, longitude: 35.05862271 },
      timestamp: new Date().getTime()
    });
  }, 22000);
  return geoLocationMock;
};
