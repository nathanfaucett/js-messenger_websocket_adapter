module.exports = MessengerWebSocket;


function MessengerWebSocket(socket) {
    var MESSAGE_ID = 0,
        listeners = {},
        messages = {};

    socket.on("message", function onMessage(data) {
        var message = JSON.parse(data),
            id = message.id,
            name = message.name,
            callback = messages[id];

        if (name) {
            if (listeners[name]) {
                emit(listeners[name], message.data, function callback(error, data) {
                    socket.send(JSON.stringify({
                        id: id,
                        error: error || undefined,
                        data: data
                    }));
                });
            }
        } else {
            if (callback) {
                callback(message.error, message.data);
                delete messages[id];
            }
        }
    });

    this.emit = function(name, data, callback) {
        var id = MESSAGE_ID++;

        if (callback) {
            messages[id] = callback;
        }

        socket.send(JSON.stringify({
            id: id,
            name: name,
            data: data
        }));
    };

    this.on = function(name, callback) {
        var listener = listeners[name] || (listeners[name] = []);
        listener[listener.length] = callback;
    };

    this.off = function(name, callback) {
        var listener = listeners[name],
            i;

        if (listener) {
            i = listener.length;

            while (i--) {
                if (listener[i] === callback) {
                    listener.splice(i, 1);
                }
            }
        }
    };
}

function emit(listeners, data, callback) {
    var index = 0,
        length = listeners.length,
        called = false;

    function done(err, data) {
        if (called === false) {
            called = true;
            callback(err, data);
        }
    }

    function next(err, data) {
        if (err || index === length) {
            done(err, data);
        } else {
            listeners[index++](data, next);
        }
    }

    next(undefined, data);
}
