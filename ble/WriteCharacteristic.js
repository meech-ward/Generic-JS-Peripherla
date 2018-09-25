const bleno = require('bleno');
const util = require('util');
const uuids = require('./uuids');

/**
 * 
 * @param {A function that returns a promise that resolves to an array of network objects that look like {bssid, signalLevel, ssid}} networks 
 */
function WriteCharacteristic(writeData) {
  bleno.Characteristic.call(this, {
    uuid: uuids.writeCharacteristic,
    properties: ['write']
  });

  this.writeData = writeData;
}

module.exports = WriteCharacteristic;

util.inherits(WriteCharacteristic, bleno.Characteristic);

WriteCharacteristic.prototype.onWriteRequest = function(buffer, offset, withoutResponse, callback) {
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG);
    throw "Error getting data from central";
    return;
  }

  const data = JSON.parse(buffer.toString());
  console.log("Got data from central:", data);
  this.writeData(data);
  callback(this.RESULT_SUCCESS);
};