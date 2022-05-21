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
            if(tweet.retweets.some(obj => obj._id == req.body.user)){
                const index = tweet.retweets.findIndex(item => item._id == req.body.user)
                tweet.retweets.splice(index,1);
                tweet = await tweet.save()
            }else{
                tweet.retweets.push(user)
                tweet = await tweet.save()
            }
            return res.status(200).json(tweet.retweets)

        } catch (error) {

            res.status(400).json(error.message);

        }
    }
}