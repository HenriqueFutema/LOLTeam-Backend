const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const LikeSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    destination: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

LikeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Like", LikeSchema);