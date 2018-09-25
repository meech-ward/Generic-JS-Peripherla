function start(name, readData, writeData) {

  const bleno = require('bleno');

  const Service = require('./Service');
  const service = new Service(readData, writeData);

  bleno.on('stateChange', function(state) {
    if (state !== 'poweredOn') {
      bleno.stopAdvertising();
      return;
    }

    bleno.startAdvertising(name, [service.uuid], (err) => {
      if (err) {
        console.log("Error", err);
      }
    });
  });
    
  bleno.on('advertisingStart', function(err) {
    if (err) {
      console.log("Error", err);
      return;
    }
    console.log('advertising...');
    bleno.setServices([
      service
    ]);
  });
}

exports.start = start;