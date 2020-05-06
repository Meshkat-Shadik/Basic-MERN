const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const routes = require('./routes/api')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 8080



//const URL = 'mongodb+srv://shadik:shadik654@cluster0-izfh7.mongodb.net/dbcheck?retryWrites=true&w=majority'

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/db_check',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
mongoose.connection.on('connected',()=>
{
    console.log('Database is Connected!!')
})


//Data Parsing  (available for request.body)
app.use(express.json());
app.use(express.urlencoded({
    extended:false
}))

//Saving data to mongodb
// const data={
//     title:'Hey it is just testing database with mongodb',
//     body:'First data insert into mongodb for the sake of mern'
// };


// //Save method
// const newData = new TestDataSet(data);


// newData.save((error)=>
// {
//     if(error)
//     {
//         console.log('Something error occurred!!!');
//     }
//     else
//     {
//         console.log("data has been successfully saved!!");
//     }
// });




app.use(cors())

//HTTP Request Logger
app.use(morgan('tiny'));
app.use('/api',routes);


if(process.env.NODE_ENV == 'production')
{
    app.use(express.static('client/build'))
}

app.listen(PORT, console.log('Server is Starting at '+PORT));