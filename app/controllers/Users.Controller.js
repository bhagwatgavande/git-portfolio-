const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Users = require('../model/User.model');
const jwt = require("jsonwebtoken")
require('dotenv').config();
const PRIVATEKEY = process.env.PRIVATEKEY;
const global  = require("../constant/globalvar")
const UserAddress = require('../model/UserAddress.model');
var fs = require("fs");
//const  pipe  = require('node:stream/promises');
const zlib = require('node:zlib');


/*
//////////////////////////////
user registration 
@params
@username strin 
@email strin
@password string
@firstname string
@lastname string

author : Bhagwat Gavane
Date   : 26-11-2023
///////////////////////////////
*/
const registerUser = async (req, res) => {
  try {
    //console.log(req.body)
      const {
          username,
          firstName,
          lastName,
          email,
          password,
          phone,
          address
      } = req.body;
      // Check if the user already exists
      await Users.findOne({
              email: email
          })
          .then(async result => {
              if (result) {
                  return res.status(400).json({
                      message: userexist
                  });

              } else {
                  const hashedPassword = await bcrypt.hash(password, saltRounds);
                  let savedata = {
                      'username': username,
                      'password': hashedPassword,
                      'email': email,
                      'firstName': firstName,
                      'lastName': lastName,
                      'address': address,
                      'phone': phone,
                      //'userprofile':
                  }
                  // Create a new user
                  const newUser = new Users(savedata);
                  await newUser.save().then(data => {
                      if (data) {
                          return res.status(200).json({
                              message: userregistred
                          });
                      } else {
                          return res.status(400).json({
                              message: somethingwent
                          });
                      }
                  });
              }

          }).catch(error => {
              res.status(500).json({
                  message: error
              });
          })
  } catch (error) {
      res.status(500).json({
          message: 'Server error'
      });
  }
}
/*
//////////////////////////////
user login 
@params
@username strin 
@password string

author : Bhagwat Gavane
Date   : 26-11-2023
///////////////////////////////
*/
const login = async (req, res) => {

  if (!req.body.username) {
      return res.status(401).send({
          message: credentials
      });
  }
  if (!req.body.password) {
      return res.status(401).send({
          message: credentials
      });
  }
  const {
      username,
      password
  } = req.body;
  // Validate the user's credentials
  const user = await Users.findOne({
      username
  });
  if (user) {
      const check = await bcrypt.compare(password, user.password)
      if (check) {
          // Generate a JWT
          const token = jwt.sign({
            user: user
          }, process.env.JWT_SECRET, {expiresIn: '24h'} );
          // Return the JWT to the client
          res.status(200).json({
              token,
              message: userlogged
          });
      } else {
          res.status(401).send({
              message: credent
          });
      }
  } else {
      return res.status(200).json({
          message: usernot
      });
  }
}

/*
////////////////////////////////
update User Profile
@parmas as  the requirement
@params
@username strin 
@email strin
@password string
@firstname string
@lastname string
author : Bhagwat Gavane
Date   : 26-11-2023
///////////////////////////////
*/
const updateUserProfile = async (req, res) => {
  if (!req.body.userId) {
      return res.status(400).json({
          message: useridrequired
      });
  }
  const {
      username,
      firstName,
      lastName,
      phone,
      address,
  } = req.body;

  let updatedata = {
      'username': username,
      'firstName': firstName,
      'lastName': lastName,
      'address': address,
      'phone': phone,
  }
  await Users.updateOne(updatedata, {
          id: req.body.userId
      })
      .then((result) => {
          if (result) {
              res.status(200).json({
                  message: updated
              });
          } else {
              res.status(200).json({
                  message: updated
              });
          }
      }).catch((err) => {
          res.status(500).json({
              message: err
          });
      })
}

/*
////////////////////////////////
get User Profile
@parmas as oer the requirement
@params
@username strin 
@email strin
@password string
@firstname string
@lastname string
author : Bhagwat Gavane
Date   : 26-11-2023
///////////////////////////////
*/
const getUserProfileById = async (req, res) => {
  if (!req.body.userId) {
      return res.status(400).json({
          message: useridrequired
      });
  }
  await Users.findOne({
          _id: req.body.userId
      }).select({
        "password": 0,"role":0
      }).then((result) => {
          if (result) {
              res.status(200).json({
                  data:result,
                  message: userresult
              });
          } else {
              res.status(200).json({
                  message: usernot
              });
          }
      }).catch((err) => {
          res.status(500).json({
              message: err
          });
      })
}

/*
////////////////////////////////
update User  Adderess
@parmas 
@street string
@userId string 
@zip_code string
@city string
@state string
@country string
@type string
author : Bhagwat Gavane
Date   : 01-12-2023
///////////////////////////////
*/
const updateUserAdderess = async (req, res) => {
    if (!req.body.userId) {
        return res.status(400).json({
            message: useridrequired
        });
    }
    const {
        street,
        userId,
        zip_code,
        city,
        state,
        country,
        type
    } = req.body;

    let savedata = {
        'street': street,
        'userId': userId,
        'zip_code': zip_code,
        'city': city,
        'state': state,
        'country': country,
        'type': type,
    }
    await UserAddress.findOne({
        userId: req.body.userId
    }).then(async data => {
        if (!data) {
            const newUser = new UserAddress(savedata);
            await newUser.save().then(async data => {
                if (data) {
                    if (result) {
                        res.status(200).json({
                            message: detailssaved
                        });
                    } else {
                        res.status(400).json({
                            message: somethingwent
                        });
                    }
                }
            })
        } else {
            await UserAddress.updateOne(savedata, {
                userId: req.body.userId
            }).then((result) => {
                if (result) {
                    res.status(200).json({
                        message: updated
                    });
                } else {
                    res.status(200).json({
                        message: updated
                    });
                }
            })
        }
    }).catch((err) => {
        res.status(500).json({
            message: err
        });
    })
}
const readFile = async(req,res) =>{
    // fs.readFile('large-file.json', function(err, data) {
    //     if (err) { console.log(err) }
    //     console.log(JSON.stringify(data));
    //   });
    // fs.readFileSync("large-file.json").pipe(zlib.gunzip.pipe(fs.createReadStream("large-file.json")))
    const stream = fs.createReadStream("large-file.json","utf-8");
    stream.on("data",(chunk)=>res.write(chunk))
    stream.on("end",()=> res.end())
}
module.exports = {
  registerUser,
  login,
  updateUserProfile,
  getUserProfileById,
  updateUserAdderess,
  readFile
};