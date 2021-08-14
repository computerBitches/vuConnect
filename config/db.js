import mongoose from 'mongoose';
import config from 'config';
//const dbPath = config.get('mongoURI');
const path ="mongodb+srv://sir_rosebro:OV36KL6baHJcqGkx@devconnect-vfjr2.mongodb.net/test?retryWrites=true&w=majority";
const connectDB = async() => {
    try{
        //     await mongoose.connect('mongodb://localhost:27017/',{
        //     dbName:'event_db',
        //     useNewUrlParser:true,
        //     useUnifiedTopology:true,
        //     useCreateIndex:true,
        //     useFindAndModify:false
        // },
        // err => err?console.log(err) : console.log('Connected to Database'));

        await mongoose.connect(path, {useNewUrlParser: true, 
            useFindAndModify: false,useCreateIndex:true, useUnifiedTopology:true});
        console.log('MongoDB Connected...');

    } catch (err){
        console.error(err.message);
        //Exit process with failure
        process.exit(1);

        }

    }

module.exports = connectDB;

mongoose.connect('mongodb://localhost:27017/',{
    dbName:'event_db',
    useNewUrlParser:true,
    useUnifiedTopology:true
},
err=>err?console.log(err): console.log('Connected to Database'));