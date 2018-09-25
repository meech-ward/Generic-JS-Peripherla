const bleno = require('bleno');
const util = require('util');
const uuids = require('./uuids');

/**
 * 
 * @param {A function that returns a promise that resolves to an array of network objects that look like {bssid, signalLevel, ssid}} networks 
 */
function ReadCharacteristic(readData) {
  bleno.Characteristic.call(this, {
    uuid: uuids.readCharacteristic,
    properties: ['read']
  });

  this.readData = readData;
}

module.exports = ReadCharacteristic;

util.inherits(ReadCharacteristic, bleno.Characteristic);

ReadCharacteristic.prototype.onReadRequest = function(offset, callback) {
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG, null);
    return;
  }

  Promise.resolve(this.readData())
  .then((data) => {
    const string = JSON.stringify(data);
    const buffer = Buffer.from(string, 'utf8');
    callback(this.RESULT_SUCCESS, buffer);
    console.log("Sent data to central", buffer);
  })
  .catch((error) => {
    callback(this.RESULT_UNLIKELY_ERROR, Buffer.from("Couldn't read data", 'utf8'));
    throw "Error: Couldn't read data";
  });
};

module.exports = ReadCharacteristic;