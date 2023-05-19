const Types = require('../models/types.model');
const Conversations = require('../models/conversations.model');

const getAllTypes = async (req, res) => {
    try {
        const getTypes = await Types.findAll({
            // attributes: [{ exclude: ['type_id']}],
        });
        res.status(200).json(getTypes);
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong cannot get the Types',
        });
    }
}

const createType = async (req, res) => {
    const { type } = req.body;
    try {
        const newType = await Types.create({ type });
        res.status(201).send();
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong cannot create a Type',
        });
    }
}

const updateType = async (req, res) => {
    const { type } = req.body;
    try {
        const updateType = await Types.update(
            { type },
            { where: { id: req.params.id }
        });
        res.status(202).send();
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong cannot update a Type',
        });
    }
}

const deleteType = async (req, res) => {
    try {
        await Types.destroy({ where: { id: req.params.id } });
        res.status(204).send();
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong cannot delete a Type',
        });
    }
}

const getOneType = async (req, res) => {
    try{
        const getType = await Types.findOne(
            { where: { id: req.params.id },
            include: [Conversations]
        });
        res.status(200).json(getType);
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong cannot get the Type',
        });
    }
}


module.exports = {
    getAllTypes,
    createType,
    updateType,
    deleteType,
    getOneType
}

