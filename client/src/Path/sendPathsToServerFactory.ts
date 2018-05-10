import { sendPathsToServer } from './sendPathsToServer';
import axios from 'axios';
import { clearPathsFromStorageFactory, fetchPathsFromStorageFactory } from './storageUtilsFactories';

export const sendPathsToServerFactory = () =>
  sendPathsToServer(fetchPathsFromStorageFactory, axios, clearPathsFromStorageFactory);