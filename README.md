MessengerWebSocketAdapter
=======

messenger WebSocket adapter


```javascript
// Client
var WS = require("ws"),
    Messenger = require("@nathanfaucett/messenger"),
    MessengerWebSocketAdaptor = require("@nathanfaucett/messenger_websocket_adapter");


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

// Server
var ws = require("ws"),
    Messenger = require("@nathanfaucett/messenger"),
    MessengerWebSocketAdaptor = require("@nathanfaucett/messenger_websocket_adapter");


var wss = new ws.Server({
    port: 9999
});


wss.on("connection", function onConnection(socket) {
    var messenger = new Messenger(new MessengerWebSocketAdaptor(
        socket,
        function attachMessage(socket, callback) {
            socket.on("message", function onMessage(data) {
                callback(JSON.parse(data));
            });
        }
    ));

    messenger.on("message", function(data, done) {
        done(undefined, {
            message: "pong"
        });
    });
});
```
