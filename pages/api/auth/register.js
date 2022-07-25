import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User';
import Tweet from '../../../models/Tweet';
const bcrypt = require("bcrypt");
const _ = require('lodash');

export default async function handler(req,res){

    const { method } = req;

    await dbConnect()

    if (method === "POST"){
        try {

            let user = await User.findOne({username: req.body.username})
            if(user) return res.status(400).send('user already exist')

            user = new User(_.pick(req.body,['name','username','email','password','bio','location']))

            user.password = await bcrypt.hash(user.password,10)
            user = await user.save();

            res.status(201).send((_.pick(req.body,['_id','name','username','email','bio','location'])))
            
        } catch (error) {

            res.status(400).json(error.message);
            
          }
    }
}