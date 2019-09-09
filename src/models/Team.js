const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
    founder: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    candidates: {
        type: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }]
    }
});

module.exports = mongoose.model("Team", TeamSchema);