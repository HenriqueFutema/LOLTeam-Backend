const Team = require("../models/Team");

module.exports = {
    async store(req, res) {
        const team = await Team.create(req.body);

        res.status(201).json(team);
    },

    async apply(req, res) {
        const team = await Team.findById(req.params.id);

        const candidate = req.body.candidate;

        team.candidates.map(candi => {
            if (candi == candidate) {
                return res.status(400).json({ error: "Já cadastrado" });
            }
        });

        team.candidates.push(candidate);

        await team.save();

        return res.status(201).json(team);
    },

    async index(req, res) {
        const teams = await Team.find();

        return res.status(200).json(teams);
    },

    async show(req, res) {
        const team = await Team.findOne({ name: req.params.name }).populate(["candidates"]);

        if (!team) {
            return res.status(400).json({ error: "Time não encontrado" })
        }

        return res.status(200).json(team);
    }
};