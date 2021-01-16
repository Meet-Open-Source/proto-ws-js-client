import SockJS from 'sockjs-client';

const callbacks = {}; //todo create a timer for cleaning the callbacks (configurable timout - default 30sec)

let index = 0;

const sock = new SockJS('todo');

sock.onopen = function() {
  //todo communicate to server the protocol type (binary or string) - js only supports string
  console.log('open');
};

sock.onmessage = function(event) {
  if(event.data.error != null) { //todo data need to be converted to proto msgs from json string
    callbacks[event.data.index](event.data.error, null)
  } else {
    callbacks[event.data.index](null, event.data)
  }
};

sock.onclose = function() {
  console.log('close');
};

function serviceInterceptor(serviceName, requestData, callback) {
  index++;

  try {
    //todo create Request wrapper proto message and inject index and convert all to JSON
    callbacks[index] = callback;
    sock.send(requestData)

  } catch (error) {
    console.error(error);
    delete callbacks[index]
    callback(error, null)
  }
}

module.exports = serviceInterceptor
