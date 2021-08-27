'use strict'

const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'super-secret';
const user = (sequelize, DataTypes) => {
 const model=sequelize.define("users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
        type: DataTypes.VIRTUAL,
        get() {
            return jwt.sign({ username: this.username, test: 'this is a test payload' }, SECRET);
        },
        set(tokenObject) { 
            let token = jwt.sign(tokenObject, SECRET);
            return token;
        },
    
    }

  });
  model.beforeCreate(async(user)=>{
      let hash=await bcrypt.hash(user.password,10)
      user.password=hash
  })
model.authenticateBasic =async function(username,password){
  const users=await this.findOne({where:{username}})
  const Valid=await bcrypt.compare(password,user.password)
  if(Valid){
      return users
  }
  throw new Error('invalid user input')
}

model.authenticateBearer = async function (token) {
    console.log(token);
    console.log(jwt.decode(token));

    const verToken= jwt.verify(token, SECRET);

    //if not verfiied you need to throw an error
    const user = await this.findOne({ where: { username: verToken.username } });

    if(user) { return user;}
    throw new Error('Invalid user');

}


  return model;

}