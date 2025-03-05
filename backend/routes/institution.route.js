const express = require('express');
const { createInstitution, getAllInstitutions, getInstitutionById, updateInstitution, deleteInstitution } = require('../controllers/institution.controller');
const verifyToken = require('../middleware/auth.middleware.js');


const router = express.Router();

router.post('/', createInstitution);
router.get('/', verifyToken, getAllInstitutions);
router.get('/:id', verifyToken, getInstitutionById);
router.put('/:id', verifyToken,  updateInstitution);
router.delete('/:id', verifyToken, deleteInstitution);

module.exports = router;