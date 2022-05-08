import React from 'react';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';
import User from '../../../models/User';
import dbConnect from '../../../lib/dbConnect'
const bcrypt = require("bcrypt");


const secret = process.env.SECRET;


export default async function (req,res){

    const { username, password} = req.body;

    // check in db
    const {
        query: { id },
        method,
      } = req

      const email = username;

    await dbConnect()

    User.findOne({ email })
        .then(user => {
            //if user not exist than return status 400
            if (!user) return res.status(400).json({ msg: "User not exist" })

            //if user exist than compare password
            //password comes from the user
            //user.password comes from the database
            bcrypt.compare(password, user.password, (err, data) => {
                //if error than throw error
                if (err) throw err

                //if both match than you can do anything
                if (data) {
                    const token = sign({
                        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
                        username: username,
                    },
                    secret
                    );
            
                    const serialised = serialize("auth", token,{
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== "development",
                        sameSite: "strict",
                        maxAge: 60*60*24*30,
                        path: "/",
                    })
            
                    res.setHeader('Set-Cookie', serialised);
                    res.status(200).json({message:"success"});
                } else {
                    return res.status(401).json({ msg: "Invalid credencial" })
                }

            })

        })
}