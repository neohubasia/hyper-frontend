var express = require('express');
var router = express.Router();
var qs = require('qs');
var axiosHandler = require("../../library/axios-handler");

router.get('/api/getProduct', function (req, res, next) {

    axiosHandler.module.get('/api/product', {
        params: req.query,
        paramsSerializer: params => {
            return qs.stringify(params)
        }
    })
        .then(function (response) {
            res.send(response.data)
        })
        .catch(function (error) {
            res.send(error)
        })
});

module.exports = router;