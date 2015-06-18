var WS = require("ws"),
    Messenger = require("messenger"),
    MessengerWebSocketAdaptor = require("../../src/index");


var socket = new WS("ws://127.0.0.1:8888"),
    messenger = new Messenger(new MessengerWebSocketAdaptor(socket));


socket.onopen = function() {
    ping();
};


function ping() {
    messenger.emit("message", {
        message: "ping"
    }, function pong(error, data) {
        ping();
    });
}
