const express = require('express');
const router = express.Router();
const Employeeform = require('../models/Empformdallas');
// const { body, validationResult } = require('express-validator');


// ROUTE 3.1: Add a new Employeeform using: POST "/api/empuserformd/insert". Login required
router.post('/insert', async (req, res) => {

    const name = req.body.name;
    const staffingmanager = req.body.staffingmanager;
    const hourlybillingrate = req.body.hourlybillingrate;
    const companyname = req.body.companyname;
    const phone = req.body.phone;
    const companyaddress = req.body.companyaddress;
    const fax = req.body.fax;
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

    const Employee = new Employeeform({ name: name, staffingmanager: staffingmanager, companyname: companyname, phone: phone, companyaddress: companyaddress, fax: fax, managernamewhoorderedtemp: managernamewhoorderedtemp, manageremailaddress: manageremailaddress, propertygrade: propertygrade, numberofunits: numberofunits, software: software, permanentpayrate: permanentpayrate, tempname: tempname, startdate: startdate, phoneno: phoneno, enddate: enddate, temporaraypayrate: temporaraypayrate, yourmessage: yourmessage, employeeStatus: "Active" })


    try {
        await Employee.save();
        res.send("inserted data")
    } catch (err) {
        console.log(err)
    }
})





// ROUTE 3.2: Get a new Employeeform using: POST "/api/empuserformd/read". Login required
router.get('/read', async (req, res) => {

    Employeeform.find({}, (err, result) => {
        if (err) {
            res.send(err)
        }
        res.send(result);
    })
})



// ROUTE 3.3: Update ACTIVE an Employeeform using: PUT "/api/empuserformd/updateactived". Login required
router.put('/updateactived/:id', async (req, res) => {
    try {

        // Find the code to be updated and update it
        let employee = await Employeeform.findById(req.params.id);
        if (!employee) { return res.status(404).send("Not Found") }

        employee = await Employeeform.findByIdAndUpdate(req.params.id, { employeeStatusDallas: "Active" }, { new: true })
        res.json({ employee });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3.4: Update CLOSED an Employeeform using: PUT "/api/empuserformd/updateclosedd". Login required
router.put('/updateclosedd/:id', async (req, res) => {
    try {

        // Find the code to be updated and update it
        let employee = await Employeeform.findById(req.params.id);
        if (!employee) { return res.status(404).send("Not Found") }

        employee = await Employeeform.findByIdAndUpdate(req.params.id, { employeeStatusDallas: "Closed" }, { new: true })
        res.json({ employee });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})




// ROUTE 3.5: Delete a new Employeeform using: POST "/api/empuserformd/delete/:id". Login required
router.delete('/delete/:id', async (req, res) => {

    const id = req.params.id;

    await Employeeform.findByIdAndRemove(id).exec();
    res.send(id);
})



module.exports = router