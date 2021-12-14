const router = require('express').Router();
const fast2sms = require('fast-two-sms');
require('dotenv').config();
let apikey = process.env.SMPPAPI;
let numbersArr=[];

router.route('/').post((req,res)=>{
    var options = {authorization : apikey , message : `A user named ${req.body.name} and contact info ${req.body.username} has a message ${req.body.message}` ,  numbers : ['6306363669','6306363669']}
    fast2sms.sendMessage(options).then(response=>{
        console.log(response)
        res.json(response);
      })
})
router.route('/post').post((req,res)=>{
   numbersArr[0] = req.body.tosend;
   numbersArr[1] = '6306363669';
   var options = {authorization : apikey , message : `An NGO named ${req.body.name} with contact number ${req.body.phone} and address ${req.body.address} is interested in collecting your left over food.` ,  numbers : numbersArr}
   fast2sms.sendMessage(options).then(response=>{
    console.log(response)
    res.json(response);
  })
})
module.exports = router;
