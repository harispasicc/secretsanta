import mongoose from "mongoose";

const GiftSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Please enter a gift name'
    }
},
    { timestamps: true }
)

export default GiftSchema;
