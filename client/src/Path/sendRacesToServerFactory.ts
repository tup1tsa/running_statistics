import { sendRacesToServer, sendRacesToServerWithTimeout } from './sendRacesToServer';
import axios from 'axios';
import { clearRacesFromStorageFactory, fetchRacesFromStorageFactory } from './storageUtilsFactories';

const withoutTimeout = () =>
  sendRacesToServer(fetchRacesFromStorageFactory, axios, clearRacesFromStorageFactory);

export const sendRacesToServerFactory = () =>
  sendRacesToServerWithTimeout(withoutTimeout, 30);