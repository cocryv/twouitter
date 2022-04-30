import React from 'react';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';


export default async function (req,res){
    const { cookies } = req;

    const jwt = cookies.OursiteJWT;

    if(!jwt){
        res.json({message: "ur already logged out"})
    }else{
        const serialised = serialize("OursiteJWT", null,{
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: -1,
            path: "/",
        })

        res.setHeader('Set-Cookie', serialised);
        res.status(200).json({message:"loged out success"});
    }
}