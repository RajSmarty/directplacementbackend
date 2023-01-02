const express = require('express');
const router = express.Router();
const Employeeform = require('../models/Empformdallas');


// ROUTE 3.1: Add a new Employeeform using: POST "/api/empuserformd/insert". Login required
router.post('/insert', async (req, res) => {

    const todaydate = req.body.todaydate;
    const staffingmanager = req.body.staffingmanager;
    const hourlybillingrate = req.body.hourlybillingrate;
    const propertyname = req.body.propertyname;
    const phone = req.body.phone;
    const propertyaddress = req.body.propertyaddress;
    const fax = req.body.fax;
    const managementcompanyname = req.body.managementcompanyname;
    const billingemailaddress = req.body.billingemailaddress;
    const managernamewhoorderedtemp = req.body.managernamewhoorderedtemp;
    const manageremailaddress = req.body.manageremailaddress;
    const propertygrade = req.body.propertygrade;
    const numberofunits = req.body.numberofunits;
    const bilingual = req.body.bilingual;
    const software = req.body.software;
    const permanentpayrate = req.body.permanentpayrate;
    const taxcredit = req.body.taxcredit;
    const typeofassignment = req.body.typeofassignment;
    const epacertified = req.body.epacertified;
    const tempname = req.body.tempname;
    const startdate = req.body.startdate;
    const phoneno = req.body.phoneno;
    const enddate = req.body.enddate;
    const temporaraypayrate = req.body.temporaraypayrate;
    const yourmessage = req.body.yourmessage;
    // const empuserNameDallas = req.body.empuserNameDallas;
    // const empUserPosition = req.body.empUserPosition;
    // const empTempNameDallas = req.body.empTempNameDallas;
    const employeeStatus = req.body.employeeStatus;

    const Employee = new Employeeform({ todaydate: todaydate, staffingmanager: staffingmanager, hourlybillingrate:hourlybillingrate, propertyname: propertyname, phone: phone, propertyaddress: propertyaddress, fax: fax, managementcompanyname: managementcompanyname, billingemailaddress: billingemailaddress, managernamewhoorderedtemp: managernamewhoorderedtemp, manageremailaddress: manageremailaddress, propertygrade: propertygrade, numberofunits: numberofunits, bilingual: bilingual, software: software, permanentpayrate: permanentpayrate, taxcredit: taxcredit, typeofassignment: typeofassignment, epacertified: epacertified, tempname: tempname, startdate: startdate, phoneno: phoneno, enddate: enddate, temporaraypayrate: temporaraypayrate, yourmessage: yourmessage, employeeStatus: "Active" })


    try {
        await Employee.save();
        res.send("inserted data")
    } catch (err) {
        console.log(err)
    }
})

// ROUTE 3.2: Get a new Employeeform using: GET "/api/empuserformd/read". Login required
router.get('/read', async (req, res) => {

    Employeeform.find({}, (err, result) => {
        if (err) {
            res.send(err)
        }
        res.send(result);
    })
})

// ROUTE 3.3: Update ACTIVE an Employeeform using: PUT "/api/empuserformd/updateactived/:id". Login required
router.put('/updateactived/:id', async (req, res) => {
    try {

        // Find the code to be updated and update it
        let employee = await Employeeform.findById(req.params.id);
        if (!employee) { return res.status(404).send("Not Found") }

        employee = await Employeeform.findByIdAndUpdate(req.params.id, { employeeStatus: "Active" }, { new: true })
        res.json({ employee });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3.4: Update CLOSED an Employeeform using: PUT "/api/empuserformd/updateclosedd/:id". Login required
router.put('/updateclosedd/:id', async (req, res) => {
    try {

        // Find the code to be updated and update it
        let employee = await Employeeform.findById(req.params.id);
        if (!employee) { return res.status(404).send("Not Found") }

        employee = await Employeeform.findByIdAndUpdate(req.params.id, { employeeStatus: "Closed" }, { new: true })
        res.json({ employee });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3.5: Find Active Status Count using: GET "/api/empuserformd/activecount".
router.get('/activecount', async (req, res) => {

    const totalActive = await Employeeform.find().or([{ employeeStatus: "Active" }]).countDocuments();
    res.status(200).json(totalActive)

})

// ROUTE 3.6: Find Closed Status Count using: GET "/api/empuserformd/closedcount".
router.get('/closedcount', async (req, res) => {

    const totalClosed = await Employeeform.find().or([{ employeeStatus: "Closed" }]).countDocuments();
    res.status(200).json(totalClosed)

})

// ROUTE 3.7: Find All Orders Count using: GET "/api/empuserformd/closedcount".
router.get('/allordercount', async (req, res) => {

    const totalOrder = await Employeeform.find().or([{}]).countDocuments();
    res.status(200).json(totalOrder)

})

// ROUTE 3.8: Find Active Orders Count using: GET "/api/empuserformd/activeorders".
router.get('/activeorders', async (req, res) => {


    const totalActive = await Employeeform.find().or([{ employeeStatus: "Active" }])
    res.status(200).json(totalActive)

})

// ROUTE 3.9: Find Closed Orders Count using: GET "/api/empuserformd/closedorders".
router.get('/closedorders', async (req, res) => {


    const totalActive = await Employeeform.find().or([{ employeeStatus: "Closed" }])
    res.status(200).json(totalActive)

})

// ROUTE 3.10: Delete a new Employeeform using: DELETE "/api/empuserformd/delete/:id".
router.delete('/delete/:id', async (req, res) => {

    const id = req.params.id;

    await Employeeform.findByIdAndRemove(id).exec();
    res.send(id);
})

module.exports = router