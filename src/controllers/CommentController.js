const User = require("../models/User");
const Comment = require("../models/Comment");

module.exports = {
    async store(req, res) {
        const user = await User.findById(req.body.id);

        const comment = await Comment.create({
            title: req.body.title,
            content: req.body.content,
            author: req.userId
        });

        user.comments.push(comment);

        await user.save();

        return res.json(comment);
    }
};