const peripheral = require('./ble/peripheral');

peripheral.start("🤗", () => {
  return ["Message", "hello"];
}, (data) => {
  if (data.ssid === 'hello') {
    console.log("HI");
  }
  console.log("Writing data", data);
});