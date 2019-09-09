const User = require("../models/User");

module.exports = {
    async store(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json("Email não encontrado");
        }

        if (!(await user.compareHash(password))) {
            res.status(400).json("Senha inválida");
        }

        return res.json({ user, token: User.generateToken(user) });
    }
};