import { sendPathsToServer, sendPathsToServerWithTimeout } from './sendPathsToServer';
import axios from 'axios';
import { clearPathsFromStorageFactory, fetchPathsFromStorageFactory } from './storageUtilsFactories';

interface SendPathsToServerFactory {
  (): Promise<string>;
}

const withoutTimeout = () =>
  sendPathsToServer(fetchPathsFromStorageFactory, axios, clearPathsFromStorageFactory);

export const sendPathsToServerFactory: SendPathsToServerFactory = () =>
  sendPathsToServerWithTimeout(withoutTimeout, 30);