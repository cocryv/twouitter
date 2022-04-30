export default async function(req,res){
    const { cookies } = req;

    const jwt = cookies.OursiteJWT;

    if(!jwt){
        return res.json({message: 'Invalid token!'})
    }

    res.json({data:'secret data'})
}