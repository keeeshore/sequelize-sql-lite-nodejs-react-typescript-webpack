const Trade = require('../models/trades');

// /trades?type=buy&user_id=122
exports.get = async (req, res) => {
    try {
        const { params, query } = req;
        const trades = await Trade.findAll({
            where: {
                ...(query.type ? { type: query.type } : {}),
                ...(query.user_id ? { user_id: query.user_id } : {}),
                ...(query.id ? { id: query.id } : {}),
            }
        });
        res.json(trades);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getTradeById = async (req, res) => {
    try {
        const { params } = req;
        const trades = await Trade.findByPk(params.id).de;
        res.json(trades);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.create = async (req, res) => {
    try {
        const { body: data } = req;
        const trade = await Trade.create({
            ...data,
            timestamp: new Date().getTime()
        });
        res.json(trade);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.delete = async (req, res) => {
    try {
        const { params } = req;
        const trade = (await Trade.findByPk(params.id)).destroy();
        res.json({ status: 'deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}