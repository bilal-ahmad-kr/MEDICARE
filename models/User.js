const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        phone: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["admin", "doctor", "patient"],
            default: 'admin',
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        isActive:{
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("User", userSchema);