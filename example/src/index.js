var WS = require("ws"),
    Messenger = require("@nathanfaucett/messenger"),
    MessengerWebSocketAdaptor = require("../../src/index");


var socket = new WS("ws://127.0.0.1:9999"),
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
