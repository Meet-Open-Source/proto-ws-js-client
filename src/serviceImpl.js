import SockJS from 'sockjs-client';

const callbacks = {}; //todo create a timer for cleaning the callbacks (configurable timout - default 30sec)

let index = 0;

const sock = new SockJS('todo');

sock.onopen = function() {
  //todo communicate to server the protocol type (binary or string)
  console.log('open');
};

sock.onmessage = function(event) {

  if(event.data.error != null) { //todo data need to be converted to proto msgs from json string
    callbacks[event.data.index](event.data.error, null)
  } else {
    callbacks[event.data.index](null, event.data)
  }

  sock.close();
};

sock.onclose = function() {
  console.log('close');
};

function serviceInterceptor(serviceName, requestData, callback) {
  //todo create Request wrapper proto message and inject index and convert to JSON

  try {
    index++;

    sock.send(requestData)

    callbacks[index] = callback;
  } catch (error) {
    console.error(error);
    throw error; //todo create custom exception
  }
}

module.exports = serviceInterceptor
