const express = require('express');
const { createInstitution, getAllInstitutions, getInstitutionById, updateInstitution, deleteInstitution, upload } = require('../controllers/institution.controller');
const verifyToken = require('../middleware/auth.middleware.js');


const router = express.Router();

router.post('/', upload.single('image'), createInstitution);
router.get('/', getAllInstitutions);
router.get('/:id', getInstitutionById);
router.put('/:id', upload.single('image'),  updateInstitution);
router.delete('/:id', deleteInstitution);

module.exports = router;