var MessengerWebSocketAdaptorPrototype;


module.exports = MessengerWebSocketAdaptor;


function MessengerWebSocketAdaptor(socket, attachMessage, sendMessage) {
    this.__socket = socket;

    this.__attachMessage = attachMessage || defaultAttachMessage;
    this.__sendMessage = sendMessage || defaultSendMessage;
}
MessengerWebSocketAdaptorPrototype = MessengerWebSocketAdaptor.prototype;

MessengerWebSocketAdaptorPrototype.addMessageListener = function(callback) {
    this.__attachMessage(this.__socket, callback);
};

MessengerWebSocketAdaptorPrototype.postMessage = function(data) {
    this.__sendMessage(this.__socket, data);
};

function defaultAttachMessage(socket, callback) {
    socket.onmessage = function onMessage(e) {
        callback(JSON.parse(e.data));
    };
}

function defaultSendMessage(socket, data) {
    socket.send(JSON.stringify(data));
}
