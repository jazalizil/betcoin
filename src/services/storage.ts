import { MMKVLoader } from 'react-native-mmkv-storage';
import MMKVInstance from 'react-native-mmkv-storage/dist/src/mmkvinstance';

let instance: MMKVInstance;

class Storage {
  constructor() {
    if (instance) {
      throw new Error('You can only create one instance');
    }
    instance = new MMKVLoader().initialize();
  }
  getInstance() {
    return instance;
  }
}

export const storage = Object.freeze(new Storage());
