const mongoose = require("mongoose");

const WarframeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        minLength: [4, "Name must be at least 4 characters"]
    },
    companion:{
        type: String,
    },
    description:{
        type: String,
        required: [true, "Description is required"],
        minLength: [8, "Description must be at least 8 characters"]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {timestamps: true});

const Warframe = mongoose.model("warframe", WarframeSchema);

module.exports = Warframe;