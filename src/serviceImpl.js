
const callbacks = {};

let index = 0;

function serviceImpl(serviceName, requestData, callback) {
  index++;

  //TODO create Request wrapper proto message and inject index
  //TODO send web socket message
  //TODO in case web socket disconnected = throw exception

  callbacks[index] = callback;
}

module.exports = serviceImpl
