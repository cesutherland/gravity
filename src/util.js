/**
 * Utils.
 */

'use strict';

module.exports = {
  assert: function assert (value, message) {
    if (!value) throw new Error(message);
  }
}
