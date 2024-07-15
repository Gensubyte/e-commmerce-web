const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer'); // Assuming you're using multer for handling multipart/form-data

const app = express();
const upload = multer({ dest: 'uploads/' }); // Configure multer to store uploaded files in an 'uploads' directory

app.post('/upload', upload.single('file'), (req, res, next) => {
    // Get the file extension
    const fileExt = path.extname(req.file.originalname);
    // Rename the file if necessary
    const newFileName = 'newName' + fileExt;
    const newPath = path.join(__dirname, 'uploads', newFileName);

    // Move the file to the new path
    fs.rename(req.file.path, newPath, (err) => {
        if (err) {
            return res.status(500).send('Error moving file: ' + err);
        }
        res.send('File uploaded and moved successfully');
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
