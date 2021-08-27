'use strict';

const express = require("express");

const UserRouter = require("./routes/user");
app.use(express.json());
const app = express();

app.use(UserRouter);

app.get('/', (req, res) => {
    res.status(200).send('hello world')
})
module.exports={
server: app,
start: port=>{

app.listen(port, ()=>{console.log(`server is listening on port ${port}`);})


}

}

// 'use strict';

// const express = require("express");

// const UserRouter = require("./routes/user");
// app.use(express.json());
// const app = express();

// app.use(UserRouter);

// app.get('/', (req, res) => {
//     res.status(200).send('hello world')
// })
// module.exports={
// server: app,
// start: port=>{

// app.listen(port, ()=>{console.log(`server is listening on port ${port}`);})


// }

// }

