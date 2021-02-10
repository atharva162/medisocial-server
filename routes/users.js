const router = require('express').Router();
const User = require('../models/Usermodels');
require('dotenv').config();
const fast2sms = require('fast-two-sms');
let apikey = process.env.SMPPAPI;

router.route('/login').post((req,res)=>{
    User.find({username: req.body.username},(err,doc)=>{
        if(err) return console.log(err);
        if(doc.length){
            res.json(doc[0]);
        }else{
            res.json('User not found');
        }
    })
})
router.route('/register/customer').post((req,res)=>{
    User.find({username: req.body.username}).then(user=>{
        if(user.length){
            res.json('User already exists');
        }else{
            let username = req.body.username;
            let role = 'customer';
            let name = req.body.customername;
            let newUser = new User({
                 username,
                 role,
                 name
            })
            newUser.save(function(err,data){
              if(err){
                  res.json(err);
              }else{
                res.json(data);
             }
         })
}}
)
})
router.route('/register/seller').post((req,res)=>{
    User.find({username: req.body.username}).then(user=>{
        if(user.length){
            res.json('User already exists');
        }else{
            let username = req.body.username;
            let role = 'seller';
            let name = req.body.shopname;
            let address = req.body.address;
            let newUser = new User({
                 username,
                 role,
                 name,
                 address
            })
            newUser.save(function(err,data){
              if(err){
                  res.json(err);
              }else{
                res.json(data);
             }
         })
}}
)
})
router.route('/find').get((req,res)=>{
    User.find({role: 'seller'},(err,doc)=>{
        if (err) return res.json(err);
        res.json(doc);
    })
})
module.exports = router;