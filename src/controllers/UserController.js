<<<<<<< HEAD
const User = require("../models/User");
const axios = require("axios");

module.exports = {
    async index(req, res) {
        const users = await User.paginate({}, {
            page: req.query.page || 1,
            limit: 50,
            populate: ["comments"],
            sort: "-createdAt"
        });

        res.json(users);
    },

    async show(req, res) {
        const user = await User.findById(req.params.id).populate(["comments"]);
        res.json(user);
    },

    async showByNick(req, res) {
        const user = await User.findOne({ nickName: req.query.nick });
        res.json(user);
    },

    async update(req, res) {
        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        res.json(user);
    },

    async store(req, res) {
        const { name, email, password, nickName } = req.body;

        const api_key = "?api_key=RGAPI-fb19f859-b029-410c-90e4-add36e06cc64";
        const url = "https://br1.api.riotgames.com/lol/";
        const ie = url + "summoner/v4/summoners/by-name/";

        axios
            .get(`${url}${ie}${nickName}${api_key}`)
            .then(response => {
                console.log(response.data.url);
                console.log(response.data.explanation);
            })
            .catch(error => {
                return res.status(400).json(error);
            });

        if (!name && !email && !password) {
            return res.status(400).json("Preencha os campos");
        }

        if (password < 6) {
            return res.status(400).json("Senha precisa ter mais que 5 caracteres");
        }

        if (await User.findOne({ email })) {
            return res.status(400).json("Esse email já possui uma conta");
        }

        const user = await User.create(req.body);

        return res.json(user);
    }
=======
const User = require("../models/User");
const axios = require("axios");

module.exports = {
    async index(req, res) {
        const users = await User.paginate({}, {
            page: req.query.page || 1,
            limit: 50,
            populate: ["comments"],
            sort: "-createdAt"
        });

        res.json(users);
    },

    async show(req, res) {
        const user = await User.findById(req.params.id).populate(["comments"]);
        res.json(user);
    },

    async showByNick(req, res) {
        const user = await User.findOne({ nickName: req.query.nick });
        res.json(user);
    },

    async update(req, res) {
        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        res.json(user);
    },

    async store(req, res) {
        const { name, email, password, nickName } = req.body;

        const api_key = "?api_key=RGAPI-fb19f859-b029-410c-90e4-add36e06cc64";
        const url = "https://br1.api.riotgames.com/lol/";
        const ie = url + "summoner/v4/summoners/by-name/";

        axios
            .get(`${url}${ie}${nickName}${api_key}`)
            .then(response => {
                console.log(response.data.url);
                console.log(response.data.explanation);
            })
            .catch(error => {
                return res.status(400).json(error);
            });

        if (!name && !email && !password) {
            return res.status(400).json("Preencha os campos");
        }

        if (password < 6) {
            return res.status(400).json("Senha precisa ter mais que 5 caracteres");
        }

        if (await User.findOne({ email })) {
            return res.status(400).json("Esse email já possui uma conta");
        }

        const user = await User.create(req.body);

        return res.json(user);
    }
>>>>>>> Novo
};