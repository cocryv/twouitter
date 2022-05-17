import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import verifyToken from "../../lib/verifyToken";

const secret = process.env.SECRET;

export default function middleware(req) {
    const { cookies } = req;
    const jwt = cookies.auth;

    const url = req.url
    const nextUrl = req.nextUrl.clone()

    if(!(url.includes('/login'))) {
        if(jwt === undefined){
            return NextResponse.json({error:'no token'})
        }

        let isValid = verifyToken(req.cookies.auth);

        if(!isValid){
            return NextResponse.json({error:'token not valid'})
        }
    }
    
    return NextResponse.next();
}