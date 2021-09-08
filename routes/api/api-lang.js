var express = require('express');
var router = express.Router();
var path = require("path");
var fs = require("fs");

router.get('/api/getLang/:lang', function (req, res, next) {

    const filePath = path.join(__dirname, `../../lang/${req.params.lang}.json`);

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.log("Error reading file: ", err);
            res.send(err)
        }
        else {
            console.log("Success reading file: ", data.choose_me);
            res.send(data);
        }
    });
});

module.exports = router;