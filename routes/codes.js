const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Code = require('../models/Code');

// ROUTE 1: Get All the Codes using: GET "/fetchallcodes". Login required
router.get('/fetchallcodes', fetchuser, async (req, res) => {
    try {
        const codes = await Code.find({ user: req.user.id });
        res.json(codes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Get All the Codes using: GET "/fetchallactivecodes". Login required
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

// ROUTE 3: Add a new Code using: POST "/addcode". Login required
router.post('/addcode', fetchuser, async (req, res) => {
    try {
        const { todaydate, staffingmanager, selectposition, hourlybillingrate, propertyname, phone, propertyaddress, fax, managementcompanyname, billingemailaddress, managernamewhoorderedtemp, manageremailaddress, propertygrade, numberofunits, bilingual, software, permanentpayrate, taxcredit, typeofassignment, epacertified, tempname, startdate, phoneno, enddate, temporaraypayrate, yourmessage, status } = req.body;


        const code = new Code({
            todaydate, staffingmanager, selectposition, hourlybillingrate, propertyname, phone, propertyaddress, fax, managementcompanyname, billingemailaddress, managernamewhoorderedtemp, manageremailaddress, propertygrade, numberofunits, bilingual, software, permanentpayrate, taxcredit, typeofassignment, epacertified, tempname, startdate, phoneno, enddate, temporaraypayrate, yourmessage, status, user: req.user.id
        })
        const savedCode = await code.save()

        res.json(savedCode)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4: Update an existing Code using: PUT "/updatecode/:id". Login required
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

// ROUTE 5: Delete an existing Code using: DELETE "/deletecode/:id". Login required
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

// ROUTE 6: Update Active using: PUT "/updateactive/:id".
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

// ROUTE 7: Update Close using: PUT "/updateclosed/:id".
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

// ROUTE 8: Find Active Status Count using: GET "/activecount". Login required
router.get('/activecount', fetchuser, async (req, res) => {

    const codes = await Code.find({ user: req.user.id });


    const totalActive = await Code.find().or([{ user: req.user.id, status: "Active" }]).countDocuments();
    res.status(200).json(totalActive)

})

// ROUTE 9: Find Active Orders Count using: GET "/activelist". Login required
router.get('/activelist', fetchuser, async (req, res) => {

    const codes = await Code.find({ user: req.user.id });

    const totalActive = await Code.find().or([{ user: req.user.id, status: "Active" }])
    res.status(200).json(totalActive)

})

// ROUTE 10: Find Closed Orders Count using: GET "/closedlist". Login required
router.get('/closedlist', fetchuser, async (req, res) => {

    const codes = await Code.find({ user: req.user.id });

    const totalActive = await Code.find().or([{ user: req.user.id, status: "Closed" }])
    res.status(200).json(totalActive)

})

// ROUTE 11: Find All Orders Count using: GET "/allordercount". Login required
router.get('/allordercount', fetchuser, async (req, res) => {

    const codes = await Code.find({ user: req.user.id });


    const totalOrder = await Code.find().or([{ user: req.user.id }]).countDocuments();
    res.status(200).json(totalOrder)

})

module.exports = router