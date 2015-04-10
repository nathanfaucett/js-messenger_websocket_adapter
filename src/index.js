var MessengerWebSocketAdaptorPrototype;


module.exports = MessengerWebSocketAdaptor;


function MessengerWebSocketAdaptor(socket) {
    this.__socket = socket;
}
MessengerWebSocketAdaptorPrototype = MessengerWebSocketAdaptor.prototype;

MessengerWebSocketAdaptorPrototype.addMessageListener = function(callback) {
    this.__socket.onmessage = function onMessage(data) {
        callback(JSON.parse(data));
    };
};

MessengerWebSocketAdaptorPrototype.postMessage = function(data) {
    this.__socket.send(JSON.stringify(data));
};
