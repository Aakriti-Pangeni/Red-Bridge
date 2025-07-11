import jWT from "jsonwebtoken";

const token = (userId) =>{
    return jWT.sign({userId}, process.env.SECRET_KEY,{
        expiresIn:"1h"
    })
}

export default token