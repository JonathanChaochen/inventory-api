const express = require('express');
const router = express.Router();

const inventory_controller = require('../controllers/inventoryController');

/* INVENTORY ROUTES */

router.post('/inventory', inventory_controller.inventory_create);

router.delete('/inventory/:id', inventory_controller.inventory_delete);

router.patch('/inventory/:id', inventory_controller.inventory_update);

router.get('/inventory/:id', inventory_controller.inventory_details);

router.get('/inventory', inventory_controller.inventory_list);

module.exports = router;
