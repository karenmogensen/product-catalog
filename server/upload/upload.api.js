/**
 * Created by Karen on 01-05-2016.
 */
var path = require('path'),
    fs = require('fs');

var upload = {
    productImages: function(req, res, next){
        // the multiparty middleware
        var file = req.files.file;

        // get the temporary location of the file
        var tmp_path = file.path;
        // set where the file should actually exists - in this case it is in the "images" directory
        var target_path = path.join(__dirname, '..', '..', 'public/ressources/images/products', file.name);
        console.log(tmp_path);
        console.log(target_path);

        // move the file from the temporary location to the intended location
        fs.rename(tmp_path, target_path, function(err) {
            if (err) throw err;
            // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
            fs.unlink(tmp_path, function() {
                if (err) throw err;
                res.send('File uploaded to: ' + target_path + ' - ' + file.size + ' bytes');
            });
        });
    }
};

// Return the object
module.exports = upload;