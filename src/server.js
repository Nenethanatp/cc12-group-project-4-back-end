const server = require('./app');
const { Server } = require('socket.io');

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  // console.log(`User Connected: ${socket.id}`);

  socket.on('join_room', (data) => {
    socket.join(data);
  });

  socket.on('send_message', (data) => {
    io.to(data.room).emit('received_message', data);
  });
});

const port = process.env.PORT || 8000;
server.listen(port, () => console.log('port running on 8080 \n\n\n\n\n'));
