const {APP_IDS, CONTROL_MESSAGE_KEYS} = require('../common.js')
const {WS} = require('../ws.js')

let ws = new WS('/control')
ws.init()

ws.onParsedMessage = (data)=>{
  // console.log("got a parsed message", data, JSON.parse(data))
  if(data && data.TYPE){
    switch(data.TYPE){
      case CONTROL_MESSAGE_KEYS.CHANGE_APP:
        switchApp(data.payload)
        break;
      default:
        console.log(data.TYPE, "unmatched")
    }
  }
}


function switchApp(appName){
  if(!APP_IDS[appName]){
    console.error("invalid app", )
  }

  console.log("change the app to ", appName)
  document.getElementById('appFrame').src = '/app/'+APP_IDS[appName]
}