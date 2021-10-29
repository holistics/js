import { DateTime } from 'luxon';
import { InputError } from '../errors';

class TimezoneRegion {
  /**
   * @param {String} region The timezone region
   */
  constructor (region) {
    try {
      const date = DateTime.fromISO('2021-05-28T09:10:23', { zone: region });
      if (!date.isValid) {
        throw new Error(date.invalidReason);
      }
    } catch (err) {
      throw new InputError(`Invalid timezone region: ${region}, ${err.message}`);
    }
    this.region = region;
  }

  toString () {
    return this.region;
  }
}

export default TimezoneRegion;
