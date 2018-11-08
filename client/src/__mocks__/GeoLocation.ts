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
