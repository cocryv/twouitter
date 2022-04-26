import dbConnect from '../../lib/dbConnect'
import User from '../../models/User';
import Tweet from '../../models/Tweet';

export default async function handler(req,res){

    const { method } = req;

    await dbConnect()

    if (method === "GET"){

        try {

            const users = await User.find().populate('tweets');
            res.status(200).json(users);

        } catch (error) {

            res.status(400).json(error.message);

        }

    }

    if (method === "POST"){
        try {

            const user = await User.create(req.body);
            res.status(201).json(user);
            
        } catch (error) {

            res.status(400).json(error.name);
            
          }
    }
}