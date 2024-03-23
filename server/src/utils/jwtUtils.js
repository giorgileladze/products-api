import jwt from "jsonwebtoken"

export const JWT_SECRET_KEY = 'this should be some secret value';
const ACCESS_TOKEN_MAX_AGE = 60 * 60; // 1h
const REFRESH_TOKEN_MAX_AGE = 24 * 60 * 60; // 1d


const createToken = (id, maxAge) => {
    const token = jwt.sign({id}, JWT_SECRET_KEY, {
        expiresIn: maxAge
    });

    return token;
}

export const getAccessToken = (id) => {
    return createToken(id, ACCESS_TOKEN_MAX_AGE);
}

export const getRefreshToken = ({id}) => {
    return createToken(id, REFRESH_TOKEN_MAX_AGE);
}

export const parseUserId = (token) => {
    if(!token){
        return null;
    }

    let id = null;
    jwt.verify(token, JWT_SECRET_KEY, (err, data) => {
        if(data){
            id = data.id;
        }
    })

    return id;
}