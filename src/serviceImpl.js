import SockJS from 'sockjs-client';

const callbacks = {}; //TODO create a timer for cleaning the callbacks (configurable timout - default 30sec)

let index = 0;

const sock = new SockJS('TODO');

sock.onopen = function() {
  //todo communcate to server the protocol type (binary or string)
  console.log('open');
};

sock.onmessage = function(event) {

  if(event.data.error != null) { //TODO data need to be converted to proto msgs from json string
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
  //TODO create Request wrapper proto message and inject index and convert to JSON

  try {
    index++;

    sock.send(requestData)

    callbacks[index] = callback;
  } catch (error) {
    console.error(error);
    throw error; //TODO create custom exception
  }
}

module.exports = serviceInterceptor
