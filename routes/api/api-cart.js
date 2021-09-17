var express = require('express');
var router = express.Router();
var axiosHandler = require("../../library/axios-handler");

router.post('/api/updateCart', function (req, res, next) {
    axiosHandler.module.patch(`/api/cart`, { ...req.body })
        .then(function (response) {
            res.send(response.data)
        })
        .catch(function (error) {
            res.send(error)
        })
});

router.delete('/api/deleteCart', function (req, res, next) {

    axiosHandler.module.delete('/api/cart', {
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