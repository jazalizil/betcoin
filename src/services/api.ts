let instance: API;

export abstract class API {
  abstract baseURL: string;

  constructor() {
    if (instance) {
      throw new Error('You can only create one instance');
    }
    instance = this;
  }

  getInstance() {
    return this;
  }
}
