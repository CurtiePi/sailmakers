const express               = require('express');
const mailman               = require('../middleware/mailman.js');
const uploadFilter          = require('../middleware/uploadfilter.js');
const routeController       = require('../controllers/routingController');
const multer                = require('multer');
const apiUtilsRouter        = express.Router();


const fileFilter = (req, file, cb) => {
    const allowedTypes = ["application/pdf"];
    if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error("Incorrect file");
        error.code = "INCORRECT_FILETYPE";
        // error occured
        return cb(error, false)
    }
    cb(null, true);
}

const upload = multer({
    dest: './public/files/pdf',
    fileFilter
});

module.exports  = apiUtilsRouter;

/*
 * Utility routes
 */

apiUtilsRouter.post('/email', mailman.deliverEmail, (req, res, next) => {
  res.status(200).json({'message': req.message});
});

apiUtilsRouter.post('/upload', upload.single('file'), uploadFilter.checkUpload, uploadFilter.renameUpload, routeController.uploadFile);

