const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name:"directplacement",
    api_key:"343965892269658",
    api_secret:"OQMSqfo5P8K4dhk3U52fQg1K6SM"
});

module.exports = cloudinary;