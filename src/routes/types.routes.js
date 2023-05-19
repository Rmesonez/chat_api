const { Router } = require('express');
const router = Router();

const {
    getAllTypes,
    createType,
    updateType,
    deleteType,
    getOneType
} = require('../controllers/types.controller');
const validateTypes = require('../validators/types.validators');

//get all types
router.get('/api/types', getAllTypes);

//create a new type
router.post('/api/types', validateTypes, createType);

//get a type by id
router.get('/api/types/:id', getOneType);

//update a type by id
router.put('/api/types/:id', validateTypes, updateType);

//delete a type by id
router.delete('/api/types/:id', deleteType);

module.exports = router;