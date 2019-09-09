const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

const UserSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    },
    description: {
        required: false,
        type: String
    },
    nickName: {
        required: false,
        type: String
    },
    comments: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
    },
    cratedAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 8);
});

UserSchema.methods = {
    compareHash(password) {
        return bcrypt.compare(password, this.password);
    }
};

UserSchema.statics = {
    generateToken({ id }) {
        return jwt.sign({ id }, authConfig.secret, {
            expiresIn: authConfig.ttl
        });
    }
};

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("User", UserSchema);