import dbConnect from '../../../../lib/dbConnect'
import Tweet from '../../../../models/Tweet';
import User from '../../../../models/User';
const bcrypt = require("bcrypt");
const _ = require('lodash');

export default async function handler(req,res){

    const {
        query: { id },
        method,
      } = req

    await dbConnect()

    if (method === "POST"){

        try {

            let user = await User.findById(id)
            let connected_user = await User.findById(req.body.user);

            if (!user || !connected_user) return res.status(401).json({ msg: "user not found" })

            if(connected_user.follows.some(obj => obj._id == id)){
                const index = connected_user.follows.findIndex(item => item._id == id)
                connected_user.follows.splice(index,1);
                connected_user = await connected_user.save()
            }else{
                connected_user.follows.push({user:user})
                connected_user = await connected_user.save()
            }
            return res.status(200).json(connected_user.follows)

        } catch (error) {

            res.status(400).json(error.message);

        }
    }

    if (method === "GET"){
        try {

            let user = await User.findById(id).populate('follows.user')

            return res.status(200).json(user)

        } catch (error) {

            res.status(400).json(error.message);

        }
    }
}