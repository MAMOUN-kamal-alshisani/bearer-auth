
"use strict";
require("dotenv").config();
const server = require("./src/server");
const { db }=require('./src/models/index')
db.sync()
.then(()=>{
            server.start(process.env.PORT || 3002);

         })
           .catch(console.error); 
           
          //  db.sync()
          //  .then(()=>{
          //              server.start(process.env.PORT || 3002);
           
          //           })
          //             .catch(console.error); 
                      
           