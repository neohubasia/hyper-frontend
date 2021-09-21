var express = require('express');
var router = express.Router();
var axiosHandler = require("../../library/axios-handler");

router.get('/api/getTownship', function (req, res, next) {
    axiosHandler.module.get('/api/township', {
        params: req.query
    })
        .then(function (response) {
            res.send(response.data)
        })
        .catch(function (error) {
            res.send(error)
        })
});

module.exports = router;