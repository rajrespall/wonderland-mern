const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
    resourceType: {
        type: String,
        enum: ["Communication", "Sensory", "Emotional", "Routines", "Social"],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Resource = mongoose.model("Resource", resourceSchema);

module.exports = Resource;