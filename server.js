
import express from 'express';
import ConnectDb from './config/db';
import users from './routes/api/users';
import auth from './routes/api/auth';
import posts from './routes/api/posts';
import profile from './routes/api/profile';
//import cors from './middleware/cors';
const cors = require('cors');

const app = express();
app.use(cors());

//Connect Database

ConnectDb();

//Init Middleware
app.use(express.json({extended:false}));        //It allows us to get body data in the req.body
app.get('/',(req,res)=>res.send('API Runnning'));
//define Routes
app.use('/api/users',users);
app.use('/api/auth',auth);
app.use('/api/posts',posts);
app.use('/api/profile',profile);

const PORT = process.env.PORT || 5000;
var server = app.listen(PORT,()=>console.log(`server started on port ${PORT}`));
var io = require('socket.io').listen(server);

io.on('connection', function (socket) {

    socket.emit('notification',`Lorem ipsum dolor sit amet consectetur 
    adipisicing elit. Sint possimus corporis sunt necessitatibus! Minus 
    nesciunt soluta suscipit nobis. Amet accusamus distinctio cupiditate 
    blanditiis dolor? Illo perferendis eveniet cum cupiditate aliquam?`);
    
});
  