import { mapDispatchToProps } from "../../application/reactContainers/NavigationContainer";

it("should dispatch correct action on startRaceBlock call", () => {
  const dispatch = jest.fn();
  mapDispatchToProps(dispatch).startRaceBlock();
  expect(dispatch.mock.calls.length).toBe(1);
  expect(dispatch.mock.calls[0][0].payload).toEqual({
    method: "push",
    args: ["/startRace"]
  });
});

it("should dispatch correct action on detailed race stats call", () => {
  const dispatch = jest.fn();
  mapDispatchToProps(dispatch).detailedRaceStats();
  expect(dispatch.mock.calls.length).toBe(1);
  expect(dispatch.mock.calls[0][0].payload).toEqual({
    method: "push",
    args: ["/detailedRaceStats"]
  });
});

it("should dispatch correct action on overall race stats call", () => {
  const dispatch = jest.fn();
  mapDispatchToProps(dispatch).overallRaceStats();
  expect(dispatch.mock.calls.length).toBe(1);
  expect(dispatch.mock.calls[0][0].payload).toEqual({
    method: "push",
    args: ["/overallRaceStats"]
  });
});
