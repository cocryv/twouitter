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

    if (method === "GET"){

        try {

            const user = User.findById(id);
            const tweets = await Tweet.find({favs:{_id:id}}).populate('user');
            res.status(200).json(tweets);

        } catch (error) {

            res.status(400).json(error.message);

        }
    }
}