const _ = require('lodash');
const { ObjectID } = require('mongodb');
const Inventory = require('../models/inventory');

/* Handle inventory create on POST */
exports.inventory_create = (req, res) => {
  let inventory = new Inventory({ name: req.body.name });

  inventory.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.status(400).send(e);
    }
  );
};

/* Delete inventory  on DELETE */
exports.inventory_delete = (req, res) => {
  let id = req.params.id;
  // validate the id -> not valid? return 404
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  // remove by id
  Inventory.findByIdAndRemove(id)
    .then(inventory => {
      if (!inventory) {
        return res.status(404).send();
      }
      res.send(inventory);
    })
    .catch(e => res.status(400).send());
};

//  Inventory update form on PATCH.
exports.inventory_update = (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['name']);

  if (!body.name) {
    return res.status(400).send();
  }

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Inventory.findByIdAndUpdate(
    id,
    {
      $set: body
    },
    { new: true }
  )
    .then(inventory => {
      if (!inventory) {
        return res.status(404).send();
      }
      res.send({ inventory });
    })
    .catch(() => {
      res.status(400).send();
    });
};

/* Display an inventory  on GET  */
exports.inventory_details = (req, res) => {
  let id = req.params.id;

  //valid id using isValid
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  // findById
  Inventory.findById(id)
    .then(inventory => {
      if (!inventory) {
        return res.status(404).send();
      }
      res.send({ inventory });
    })
    .catch(e => res.status(400).send());
};

/* Handle inventory list on GET. */
exports.inventory_list = (req, res) => {
  Inventory.find().then(
    inventory => {
      res.send({ inventory });
    },
    e => {
      res.status(400).send(e);
    }
  );
};
