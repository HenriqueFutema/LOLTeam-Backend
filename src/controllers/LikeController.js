const Like = require("../models/Like");

module.exports = {
    async index(req, res) {
        const likes = await Like.paginate({}, {
            page: req.query.page || 1,
            limit: 20,
            populate: ["author", "destination"],
            sort: "-createdAt"
        });
        return res.json(likes);
    },

    async store(req, res) {
        const like = await Like.create(req.body);
        res.json(like);
    }
};