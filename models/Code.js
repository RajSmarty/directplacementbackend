const mongoose = require('mongoose');
const { Schema } = mongoose;

const CodesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    todaydate: {
        type: String,
    },
    staffingmanager: {
        type: String,
    },
    selectposition: {
        type: String,
    },
    hourlybillingrate: {
        type: String,
    },
    propertyname: {
        type: String,
    },
    phone: {
        type: String,
    },
    propertyaddress: {
        type: String,
    },
    fax: {
        type: String,
    },
    managementcompanyname: {
        type: String,
    },
    billingemailaddress: {
        type: String,
    },
    managernamewhoorderedtemp: {
        type: String,
    },
    manageremailaddress: {
        type: String,
    },
    propertygrade: {
        type: String,
    },
    numberofunits: {
        type: String,
    },
    bilingual: {
        type: String,
    },
    software: {
        type: String,
    },
    permanentpayrate: {
        type: String,
    },
    taxcredit: {
        type: String,
    },
    typeofassignment: {
        type: String,
    },
    epacertified: {
        type: String,
    },
    tempname: {
        type: String,
    },
    startdate: {
        type: String,
    },
    phoneno: {
        type: String,
    },
    enddate: {
        type: String,
    },
    temporaraypayrate: {
        type: String,
    },
    yourmessage: {
        type: String,
    },
    status: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('codes', CodesSchema);