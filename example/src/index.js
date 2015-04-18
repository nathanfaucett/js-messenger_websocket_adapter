var WS = require("ws"),
    Messenger = require("messenger"),
    MessengerWebSocketAdaptor = require("../../src/index");


var socket = new WS("ws://127.0.0.1:8888"),
    messenger;


socket.onopen = function() {
    messenger = new Messenger(new MessengerWebSocketAdaptor(socket));
    ping();
};


function ping() {
    messenger.emit("message", {
        message: "ping"
    }, function pong(error, data) {
        ping();
    });
}
