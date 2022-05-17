import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User';
import Tweet from '../../../models/Tweet';
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

            const users = await User.findById(id);
            res.status(200).json(users);

        } catch (error) {

            res.status(400).json(error.message);

        }
    }

    if (method === "PUT"){

        try {
            const user = await User.findByIdAndUpdate(id, req.body, {
              new: true
            })
            if (!user) {
              return res.status(400).json({ success: false })
            }
            res.status(200).json({ success: true, data: user })
          } catch (error) {
            res.status(400).json({ success: false })
          }
    }
}