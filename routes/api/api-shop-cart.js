var express = require('express');
var router = express.Router();
var axiosHandler = require("../../library/axios-handler");

router.get('/api/getCartList', function (req, res, next) {
    axiosHandler.module.get('/api/cart', {
        params: req.query
    })
        .then(function (response) {
            res.send(response.data)
        })
        .catch(function (error) {
            res.send(error)
        })
});


router.post('/api/addToCart', function (req, res, next) {
    axiosHandler.module.post('/api/cart', req.body)
        .then(function (response) {
            res.send(response.data)
        })
        .catch(function (error) {
            res.send(error)
        })
});

module.exports = router;