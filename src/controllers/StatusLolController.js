const axios = require("axios");
module.exports = {
    async show(req, res) {
        const nickName = req.body.nickName;
        const api_key = "RGAPI-e9ac3d34-af6f-4bb4-a2a5-ab5aebf73232";

        const tud = `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nickName}?api_key=${api_key}`;

        axios
            .get(`${tud}`, {}, {})
            .then(response => {
                return res.status(200).json(response.data);
            })
            .catch(error => {
                return res.status(400).json(error);
            });
    }
};