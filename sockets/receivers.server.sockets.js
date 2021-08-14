var socketIO;
exports.receivers = (io) => {
socketIO = io;
io.emit('notification','hello');
}
// handle different type of notification.