import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

const secret = process.env.SECRET;

export default function middleware(req) {
    const { cookies } = req;

    const jwt = cookies.auth;

    const url = req.url
    const nextUrl = req.nextUrl.clone()

    if(url.includes('/login')) {
        if(jwt){
            try {
                return NextResponse.redirect(`${nextUrl.origin}/`);
            } catch (error) {
                return NextResponse.redirect(`${nextUrl.origin}/login`);
            }
        }
    }

    if(url.includes('/message')) {
        if(jwt === undefined){
            return NextResponse.redirect(`${nextUrl.origin}/login`);
        }

        try {
            return NextResponse.next();
        } catch (error) {
            return NextResponse.redirect(`${nextUrl.origin}/login`);
        }
    }
    
    return NextResponse.next();
}