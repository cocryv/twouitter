import Tweet from '../../models/Tweet';
import User from '../../models/User';
const {validate} = require('../../models/Tweet')
import dbConnect from '../../lib/dbConnect'

export default async function handler(req,res){

    const {
        query: { id },
        method,
      } = req

    await dbConnect()

    if (method === "GET"){

        try {
            const tweets = await Tweet.find().populate('user');
            res.status(200).json(tweets);

        } catch (error) {
            res.status(400).json(error.toString());
        }
    }

    if (method === "POST"){
        try {

            const tweet = await Tweet.create(req.body);
            res.status(201).json(tweet);
            
        } catch (error) {
            res.status(400).json(error.toString());
        }
    }
}