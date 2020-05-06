const express = require('express');
const path = require('path');
const TestDataSet = require('../models/TestDataSet')

const router = express.Router();

// const TestDataSet = require('../models/TestDataSet.js');
//const TestDataSet = require('../models/TestDataSet')

//ROUTES
router.get('/',(req,res)=>
{
    const data = {
        username: 'Meshkat Shadik',
        faculty:'CSE'
    }
    res.json(data);
})

router.get('/name',(req,res)=>
{
    // const data = {
    //     username: 'Shadik',
    //     id:1602058
    // };
    TestDataSet.find({})
    .then((data)=>{
        console.log('data ',data);
        res.json(data);
    })
    .catch((err)=>{
        console.log('Error ',err);
    })
    // res.json(data);
})


router.post('/save',(req,res)=>
{
  console.log("Body: ",req.body);

  //TestDataSet value
    const datas = req.body;
    const newData = new TestDataSet(datas);
    newData.save((error)=>
    {
        if(error)
        {
             res.status(500).json({
                 msg:'Sorry, Internal Server Errors!'
             })   
             return;
        }
            return  res.json(
                {
                    msg:'We received your data!'
                }
            );
    })

})


module.exports = router;