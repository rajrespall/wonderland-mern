const mongoose = require("mongoose");

const symptomSchema = new mongoose.Schema({
    symptom: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        required: true
    }
}, {
    _id: false
});

const childSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    symptoms: [symptomSchema]
}, {
    _id: false
});

const profileSchema = new mongoose.Schema({
    parentName: {
        type: String,
        required: true
    },
    contactInfo: {
        type: String,
        required: true
    },
    children: [childSchema]
}, {
    timestamps: true
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;