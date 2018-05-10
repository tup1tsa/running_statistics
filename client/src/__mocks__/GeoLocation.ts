import {
  ErrorWatchCallback,
  PositionResponse,
  SuccessWatchCallback,
  GeoLocation,
  Options
} from '../Path/PathWatcher';

export class GeoLocationMock implements GeoLocation {

  public providedSuccessCallback: SuccessWatchCallback;
  public providedErrorCallback: ErrorWatchCallback;
  public options: Options;
  public watchId: null | number = null;
  public watchPositionWasCalledTimes = 0;
  public clearWatchWasCalled = {
    status: false,
    providedWatchNumber: 0
  };

  clearWatch(watchId: number) {
    this.providedErrorCallback = () => undefined;
    this.providedSuccessCallback = () => undefined;
    this.clearWatchWasCalled.status = true;
    this.clearWatchWasCalled.providedWatchNumber = watchId;
    this.watchId = null;
  }

  watchPosition(successCallback: SuccessWatchCallback, errorCallback: ErrorWatchCallback, options: Options) {
    this.watchPositionWasCalledTimes++;
    this.providedSuccessCallback = successCallback;
    this.providedErrorCallback = errorCallback;
    this.options = options;
    this.watchId = Math.ceil(Math.random() * 1000);
    return this.watchId;
  }

  sendPosition(position: PositionResponse) {
    this.providedSuccessCallback(position);
  }

  sendError(error: string) {
    this.providedErrorCallback({
      code: 1,
      message: error
    });
  }

}