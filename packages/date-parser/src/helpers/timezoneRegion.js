import { DateTime } from 'luxon';
import { InputError } from '../errors';

class TimezoneRegion {
  /**
   * @param {String} region The timezone region
   */
  constructor (region) {
    try {
      DateTime.fromISO('2021-05-28T09:10:23', { zone: region });
    } catch (err) {
      throw new InputError(`Invalid timezone region: ${err.message}`);
    }
    this.region = region;
  }

  toString () {
    return this.region;
  }
}

export default TimezoneRegion;
