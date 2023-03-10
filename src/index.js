require('dotenv').config()


if(process.env.EMULATOR=="true"){
  console.log("Running in emulator mode -============")
}
const configs = require("./config/config-manager");
const { Display, DisplayEvents } = require("./display/display.js");
const { powerUnitEvents } = require("./display/power-unit");
const {AppServer, AppServerEvents} = require('./appserver')
const {GumbandExhibit} = require("./gumband")
const display = new Display();


const gumband = new GumbandExhibit()

gumband.on('APP_ID', (payload)=>{
  console.log("set app")
  appServer.changeApp(payload.value)
})

gumband.on('RELOAD_APP', (payload)=>{
  appServer.reloadApp()
})





appServer = new AppServer();
// appBroker = new AppBroker({appserver})
appServer.init()


//when buttons aka inputs change state, end them to the app broker
display.on(DisplayEvents['STATE_INPUT'], (globalStateChanges)=>{
  appServer.updateInputState(globalStateChanges)
})

display.on(DisplayEvents['ONLINE_STATUS'], (status)=>{
  gumband.sendDisplayOnlineStatus(status)
})

display.on(powerUnitEvents['STATUS'], (powerUnitStatus)=>{
  gumband.sendPowerUnitStatus(powerUnitStatus)
})

//when pixels are updated
appServer.on(AppServerEvents['STATE'], (pixelData)=>{
  display.pixelMessageHandler(pixelData)
})