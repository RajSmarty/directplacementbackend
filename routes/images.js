const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
// const Code = require('../models/Code');
const Image = require('../models/Image');
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');

// ROUTE UPLOAD required
// router.post('/uploadimage',fetchuser, uploadImage, upload)
router.post('/uploadimage', fetchuser, upload.single('image'), async (req, res) => {
    try {
        // const codes = await Code.find({ user: req.user.id });
        // res.json(codes)

        // let users = await Code.find().or([{avatar : ""}]);

        // if(!users){
        // Create instance of User 
        const result = await cloudinary.uploader.upload(req.file.path);
        let user = new Code({
            avatar: result.secure_url,
            cloudinary_id: result.public_id,
            user: req.user.id
        })
        // Save user
        await user.save();
        res.json(user)
    }
    // else{
    //     let user = await Code.findById(req.params.id);
    //     await cloudinary.uploader.destroy(user.cloudinary_id);
    //     const result = await cloudinary.uploader.upload(req.file.path);
    //     const data = {
    //         avatar: result.secure_url || user.avatar,
    //         cloudinary_id: result.public_id || user.cloudinary_id,
    //     }
    //     user = await Code.findByIdAndUpdate(req.params.id, data, {new: true});
    //     res.json(user);
    // }
    // }
    catch (error) {
        console.log(error)
    }
})

router.get('/getimage', fetchuser, async (req, res) => {
    try {
        // Save user
        let img = await Image.find();
        res.json(img)
    }
    catch (error) {
        console.log(error)
    }
})

// GET IMAGE 
router.put('/uploadedimage/:id', fetchuser, upload.single('image'), async (req, res) => {
    try {
        // Create instance of User 
        let user = await Image.findById(req.params.id);
        await cloudinary.uploader.destroy(user.cloudinary_id);
        const result = await cloudinary.uploader.upload(req.file.path);
        const data = {
            avatar: result.secure_url || user.avatar,
            cloudinary_id: result.public_id || user.cloudinary_id,
        }
        user = await Image.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json(user);


    }
    catch (error) {
        console.log(error)
    }
})

module.exports = router
