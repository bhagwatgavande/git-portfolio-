const global  = require("../constant/globalvar")
const Categories = require('../model/Category.model');



/*
//////////////////////////////
add category 
@params
@name string
@description string

author : Bhagwat Gavane
Date   : 2-12-2023
///////////////////////////////
*/
const addCategory = async (req, res) => {
    try {
        const {
            name,
            description,
        } = req.body;
        // Check if the category name already exists
        await Categories.findOne({
                name: name
            })
            .then(async result => {
                if (result) {
                    return res.status(200).json({
                        message: categoryexist
                    });
                } else {
                    let savedata = {
                        'name': name,
                        'description': description,
                    }
                    //save category details //
                    const newCategories = new Categories(savedata);
                    await newCategories.save().then(data => {
                        if (data) {
                            return res.status(200).json({
                                message: categoryadd
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
////////////////////////////////
get All Categories
@parmas as oer the requirement
@name string
@description string

author : Bhagwat Gavane
Date   : 2-12-2023
///////////////////////////////
*/
const getAllCategories = async (req, res) => {
    //get all categories listing//
    await Categories.find({}).then((result) => {
        if (result) {
            res.status(200).json({
                data: result,
                message: category
            });
        } else {
            res.status(200).json({
                message: categorynot
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: err
        });
    })
}
  
module.exports = {
    addCategory,
    getAllCategories
}