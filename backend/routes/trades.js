const express = require('express');
const router = express.Router();
const tradeController = require('../controllers/trades');

router.get('/', tradeController.get);

router.post('/', tradeController.create);

router.delete('/:id', tradeController.delete);

module.exports = router;
