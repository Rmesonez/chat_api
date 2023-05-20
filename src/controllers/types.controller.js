const Types = require('../models/types.model');
const Conversations = require('../models/conversations.model');

const getAllTypes = async (req, res, next) => {
    try {
        const getTypes = await Types.findAll({
        });
        res.status(200).json(getTypes);
    } catch (error) {
        next(error);
    }
}

const createType = async (req, res, next) => {
    const { type } = req.body;
    try {
        const newType = await Types.create({ type });
        res.status(201).send();
    } catch (error) {
        next(error);
    }
}

const updateType = async (req, res, next) => {
    const { type } = req.body;
    try {
        const updateType = await Types.update(
            { type },
            { where: { id: req.params.id }
        });
        res.status(202).send();
    } catch (error) {
        next(error);
    }
}

const deleteType = async (req, res, next) => {
    try {
        await Types.destroy({ where: { id: req.params.id } });
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

const getOneType = async (req, res, next) => {
    try{
        const getType = await Types.findOne(
            { where: { id: req.params.id },
            include: [Conversations]
        });
        res.status(200).json(getType);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getAllTypes,
    createType,
    updateType,
    deleteType,
    getOneType
}

