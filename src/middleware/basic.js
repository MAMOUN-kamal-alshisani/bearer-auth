'use strict'
const base64=require('base-64')



module.exports =(users)=>(req,res,next)=>{
    if(!req.headers.authorization){
       next('unthorized login')
       return
    }
    const encoded =req.headers.authorization.split(' ').pop()
    const[username,password]=base64.decode(encoded).split(':')
    users.authenticateBasic(username,password)
    .then((user)=>{
        req.user=user;
        next()
    })
    .catch((err)=>{
        next(err,'invalid login')
    })

}