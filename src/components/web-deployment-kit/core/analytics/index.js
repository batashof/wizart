import { getLang, getUserId, uuid } from './utils';
import config from '../config';

class Analytics {
  constructor(apiToken, packageName) {
    this.version = '1';
    this.tid = config.TID;
    this.apiToken = apiToken;
    this.lang = getLang();
    this.packageName = packageName;
    this.userId = getUserId();
  }

  logEvent(eventName, action, options = {}) {
    const queryParams = {
      v: this.version,
      t: 'event',
      tid: config.TID,
      cid: this.userId,
      ul: this.lang,
      ec: eventName,
      ea: action,
      an: this.packageName,
      cn: this.packageName,
      // ci: this.apiToken,
      cd1: this.apiToken,
      ...options,
      z: uuid(),
    };

    return fetch(
      `https://www.google-analytics.com/collect?${new URLSearchParams(queryParams).toString()}`,
    );
  }
}

export default Analytics;
