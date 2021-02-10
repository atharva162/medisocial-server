const router = require('express').Router();
let Post = require('../models/Postmodel');
const User = require('../models/Usermodels');
const fast2sms = require('fast-two-sms');
let numbersArr=[];
require('dotenv').config();
let apikey = process.env.SMPPAPI;

router.route('/').get((req,res) =>{
    Post.find().then(posts => res.json(posts)).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) =>{
    const creator = req.body.username;
    const name = req.body.name;
    const title = req.body.title;
    const image = req.body.image;

    const newPost = new Post({
        creator,
        name,
        title,
        image
    })
     newPost.save().then(()=> 
    User.find({role: 'seller'},(err,doc)=>{
        doc.forEach(userdetails=>{
            numbersArr.push(userdetails.username)
        })
        var options = {authorization : apikey , message : `A user named ${req.body.username} has added a medicine named ${req.body.title}
        By:- MediSocial` ,  numbers : numbersArr}
        fast2sms.sendMessage(options).then(response=>{
            console.log(response)
            res.json(response);
          })
    })
    ).catch(err=> res.status(400).json('Error: '+ err))
})
   router.route('/:id').get((req,res)=>{
       Post.findById(req.params.id).then(post =>
           res.json(post)).catch(err =>
            res.status(400).json('Error: '+ err));
   })

   router.route('/:id').delete((req,res)=>{
       Post.findByIdAndDelete(req.params.id).then(()=>res.json('Post deleted')).catch(err=> res.status(400).json('Error: '+ err));
   })
    
   router.route('/update/:id').post((req,res)=>{
       Post.findById(req.params.id).then(post =>{
           post.creator = req.body.creator;
           post.title = req.body.title;
           post.image = req.body.image;
            
           post.save().then(()=> res.json('Post Updated')
           ).catch(err=> res.status(400).json('Error: '+ err));
       }).catch(err=> res.status(400).json('Error: '+ err));
   })
module.exports = router;