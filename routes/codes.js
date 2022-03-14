const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Code = require('../models/Code');
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');

// var multer = require('multer')
// const { upload, uploadImage } = require('../controller/imagecontroller');


// ROUTE 1: Get All the Codes using: GET "/api/codes/getuser". Login required
router.get('/fetchallcodes', fetchuser, async (req, res) => {
    try {
        const codes = await Code.find({ user: req.user.id });
        res.json(codes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 1: Get All the Codes using: GET "/api/codes/getuser". Login required
router.get('/fetchallactivecodes', fetchuser, async (req, res) => {
    try {
        const codes = await Code.find({ user: req.user.id });
        const totalActive = await Code.find().or([{ status: "Active" }]).countDocuments();
        if (!totalActive) {
            console.log(error)
        }
        else {
            res.json(codes)

        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Code using: POST "/api/codes/addcode". Login required
router.post('/addcode', fetchuser, async (req, res) => {
    try {
        const { name, staffingmanager, selectposition, hourlybillingrate, companyname, phone, companyaddress, fax, managernamewhoorderedtemp, manageremailaddress, propertygrade, numberofunits, bilingual, software, permanentpayrate, taxcredit, typeofassignment, epacertified, tempname, startdate, phoneno, enddate, temporaraypayrate, yourmessage, status } = req.body;


        const code = new Code({
            name, staffingmanager, selectposition, hourlybillingrate, companyname, phone, companyaddress, fax, managernamewhoorderedtemp, manageremailaddress, propertygrade, numberofunits, bilingual, software, permanentpayrate, taxcredit, typeofassignment, epacertified, tempname, startdate, phoneno, enddate, temporaraypayrate, yourmessage, status, user: req.user.id
        })
        const savedCode = await code.save()

        res.json(savedCode)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE UPLOAD required
// router.post('/uploadimage',fetchuser, uploadImage, upload)
router.post('/uploadimage', fetchuser, upload.single('image'), async (req, res) => {
    try {
        const codes = await Code.find({ user: req.user.id });
        res.json(codes)

        let users = await Code.find().or([{ avatar: "" }]);

        if (!users) {
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
        else {
            let user = await Code.findById(req.params.id);
            await cloudinary.uploader.destroy(user.cloudinary_id);
            const result = await cloudinary.uploader.upload(req.file.path);
            const data = {
                avatar: result.secure_url || user.avatar,
                cloudinary_id: result.public_id || user.cloudinary_id,
            }
            user = await Code.findByIdAndUpdate(req.params.id, data, { new: true });
            res.json(user);
        }
    }
    catch (error) {
        console.log(error)
    }
})

// GET IMAGE 
router.put('/uploadedimage/:id', fetchuser, upload.single('image'), async (req, res) => {
    try {
        // Create instance of User 
        let user = await Code.findById(req.params.id);
        await cloudinary.uploader.destroy(user.cloudinary_id);
        const result = await cloudinary.uploader.upload(req.file.path);
        const data = {
            avatar: result.secure_url || user.avatar,
            cloudinary_id: result.public_id || user.cloudinary_id,
        }
        user = await Code.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json(user);


    }
    catch (error) {
        console.log(error)
    }
})






// ROUTE 3: Update an existing Code using: PUT "/api/codes/updatecode". Login required
router.put('/updatecode/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // Create a newCode object
        const newCode = {};
        if (title) { newCode.title = title };
        if (description) { newCode.description = description };
        if (tag) { newCode.tag = tag };

        // Find the code to be updated and update it
        let code = await Code.findById(req.params.id);
        if (!code) { return res.status(404).send("Not Found") }

        if (code.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        code = await Code.findByIdAndUpdate(req.params.id, { $set: newCode }, { new: true })
        res.json({ code });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4: Delete an existing Code using: DELETE "/api/codes/deletecode". Login required
router.delete('/deletecode/:id', fetchuser, async (req, res) => {
    try {
        // Find the code to be delete and delete it
        let code = await Code.findById(req.params.id);
        if (!code) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Code
        if (code.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        code = await Code.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Code has been deleted", code: code });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// Update Active 
router.put('/updateactive/:id', async (req, res) => {
    try {

        // Find the code to be updated and update it
        let employee = await Code.findById(req.params.id);
        if (!employee) { return res.status(404).send("Not Found") }

        employee = await Code.findByIdAndUpdate(req.params.id, { status: "Active" }, { new: true })
        res.json({ employee });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Update Close 
router.put('/updateclosed/:id', async (req, res) => {
    try {

        // Find the code to be updated and update it
        let employee = await Code.findById(req.params.id);
        if (!employee) { return res.status(404).send("Not Found") }

        employee = await Code.findByIdAndUpdate(req.params.id, { status: "Closed" }, { new: true })
        res.json({ employee });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});



// ROUTE 2.4: Find Active Status Count using: GET "/api/empuserformh/activecount".
router.get('/activecount', fetchuser, async (req, res) => {

    const codes = await Code.find({ user: req.user.id });


    const totalActive = await Code.find().or([{user: req.user.id, status: "Active" }]).countDocuments();
    res.status(200).json(totalActive)

})

// ROUTE 2.4: Find Active Orders Count using: GET "/api/empuserformh/activelist".
router.get('/activelist', fetchuser, async (req, res) => {

    const codes = await Code.find({ user: req.user.id });

    const totalActive = await Code.find().or([{user: req.user.id, status: "Active" }])
    res.status(200).json(totalActive)

})

// ROUTE 2.4: Find Closed Orders Count using: GET "/api/empuserformh/closedlist".
router.get('/closedlist', fetchuser, async (req, res) => {

    const codes = await Code.find({ user: req.user.id });

    const totalActive = await Code.find().or([{user: req.user.id, status: "Closed" }])
    res.status(200).json(totalActive)

})


// ROUTE 2.6: Find All Orders Count using: GET "/api/empuserformh/closedcount".
router.get('/allordercount', fetchuser, async (req, res) => {

    const codes = await Code.find({ user: req.user.id });


    const totalOrder = await Code.find().or([{user: req.user.id}]).countDocuments();
    res.status(200).json(totalOrder)

})


module.exports = router