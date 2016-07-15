var ws = require("ws"),
    Messenger = require("@nathanfaucett/messenger"),
    MessengerWebSocketAdaptor = require("../src/index");
    
    
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
