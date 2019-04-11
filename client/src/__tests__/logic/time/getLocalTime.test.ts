import { getLocalTimeFactory } from "../../../application/logic/time/getLocalTime";

it("should return proper time", () => {
  const testTime = 15000;

  let createdTime: number = 0;
  let toLocaleWasCalled: boolean = false;

  class Date {
    public time: number;

    constructor(time: number) {
      this.time = time;
      createdTime = time;
    }

    public toLocaleTimeString() {
      toLocaleWasCalled = true;
      return "2 am";
    }
  }

  expect(getLocalTimeFactory(Date)(testTime)).toBe("2 am");
  expect(toLocaleWasCalled).toBe(true);
  expect(createdTime).toBe(testTime);
});
