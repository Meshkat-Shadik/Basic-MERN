const mongoose = require('mongoose')


//Schema
const Schema = mongoose.Schema;
const TestDataSchema = new Schema({
    title:String,
    body:String,
    date:{
        type:String,
        default: new Date().getTime()
    }
});


//Model
const TestDataSet = mongoose.model('TestDataSet',TestDataSchema);

module.exports = TestDataSet;