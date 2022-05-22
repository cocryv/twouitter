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

            let tweet = await Tweet.findById(id).populate('user');
            const user = await User.findById(req.body.user);
            if (!tweet) return res.status(401).json({ msg: "this tweet don't exist" })

            tweet.comments.push({user:user,body:req.body.body})
            tweet = await tweet.save()

            return res.status(200).json(tweet.comments)

        } catch (error) {

            res.status(400).json(error.message);

        }
    }
}