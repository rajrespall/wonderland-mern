const express = require('express');
const { createResource, getAllResources, getResourceById, updateResource, deleteResource } = require('../controllers/resources.controller');
const router = express.Router();

// Routes for resources
router.post('/', createResource);
router.get('/', getAllResources);
router.get('/:id', getResourceById);
router.put('/:id', updateResource);
router.delete('/:id', deleteResource);

module.exports = router;