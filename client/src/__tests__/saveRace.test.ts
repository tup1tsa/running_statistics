import { saveRace } from '../saveRace';
import { Race } from '../common_files/interfaces';

it('should save run correctly', async (done) => {
  const race: Race = {
    type: 'walking',
    path: [{
      latitude: 17,
      longitude: 22,
      time: 2323
    }]
  };
  const saveRaceMock = jest.fn();
  const sendRacesToServer = jest.fn();
  await saveRace(race, saveRaceMock, sendRacesToServer);
  expect(saveRaceMock.mock.calls.length).toBe(1);
  expect(saveRaceMock.mock.calls[0][0]).toBe(race);
  expect(sendRacesToServer.mock.calls.length).toBe(1);
  done();
});