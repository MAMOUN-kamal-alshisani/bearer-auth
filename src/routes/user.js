'use strict'
const express=require('express')
 const router=express.Router()
 const basic=require('../middleware/basic')
 const bearer = require('../middleware/bearer');
const {users}=require('../models/index')

 router.post('/signUp',signUp)
 router.post('/sginIn',basic(users),siginIn)

 router.get('/user', bearer(users),user)
//  console.log(req.body)
  async function signUp (req,res)
{ 
    const data=await users.create({
        username : req.body.username,
        password: req.body.password
    });
    res.json(data);
   
}


async function siginIn(req,res){
    res.status(200).send(req.user)

}

 async function  user (req, res) {
    res.status(200).send(req.user);
};

module.exports=router