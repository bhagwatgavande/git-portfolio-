const jwt = require("jsonwebtoken")
const global  = require("../constant/globalvar")
const config  = require("../config/auth.config")
const Users = require('../model/User.model');

var Id = ""
 verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"]
    if (!token) {
        return res.status(400).json({
            message: noToken
        });
    }
jwt.verify(token, config.secret, (err, decode) => {
    if (err) {
        return res.status(400).json({
            message: unauthorized
        });
    }
    data = JSON.parse(atob(token.split('.')[1]))
    Id = data._id
    next()
})
}
isAdmin = (req, res, next) => {
        Users.findOne(Id)
        .then((user) => {
            if (user.role == 2) {
                next();
                return
            } else {
                return res.status(400).json({
                    message: unauthorized
                });
            }
        })
}
isUser = (req, res, next) => {
    Users.findById(req.userId)
        .then((user) => {
            if (user.role == 1) {  
                next();
                return
            } else {
                return res.status(400).json({
                    message: unauthorized
                });
            }
        })
}
isManager = (req, res, next) => {
    Users.findById(req.userId)
        .then((user) => {
            if (user.role == 3) {
                next();
                return
            } else {
                return res.status(400).json({
                    message: unauthorized
                });
            }
        })
}
const authJwt = {
    verifyToken:verifyToken,
    isAdmin:isAdmin,
    isUser:isUser,
    isManager:isManager
}
module.exports = authJwt