const fs = require('fs'); 


const checkUpload = (err, req, res, next) => {
    if (err.code === "INCORRECT_FILETYPE") {
        res.status(422).json({ 'error': 'Only PDF files are allowed'});
        return;
    }

    next();
}

const renameUpload = (req, res, next) => {
    var file_path = req.file.destination;
    var filename = req.file.path;
    var new_filename = `${file_path}/${req.file.originalname}`;

    fs.rename(filename, new_filename, () => {
      console.log("\nFile Renamed!\n");
      next();
    })
}

module.exports = {
    checkUpload,
    renameUpload
}
