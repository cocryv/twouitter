import { verify } from "jsonwebtoken";

const secret = process.env.SECRET;

function verifyToken (jwt){
    try {
        const payload = verify(jwt,secret);
        return payload;

    } catch (error) {
        return false
    }
}

export default verifyToken