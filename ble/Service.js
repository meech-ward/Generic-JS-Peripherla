const bleno = require('bleno');
const util = require('util');
const uuids = require('./uuids');

const ReadCharacteristic = require('./ReadCharacteristic');
const WriteCharacteristic = require('./WriteCharacteristic');

function Service(readData, writeData) {
  bleno.PrimaryService.call(this, {
      uuid: uuids.service,
      characteristics: [
          new ReadCharacteristic(readData),
          new WriteCharacteristic(writeData)
      ]
  });
}

util.inherits(Service, bleno.PrimaryService);

module.exports = Service;