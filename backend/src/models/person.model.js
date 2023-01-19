import mongoose from "mongoose";
import GiftSchema from "./gift.model";

const PersonSchema = new mongoose.Schema({
    fullName: {
        type: String,
        trim: true,
        required:'Name is required'
    },
    gifts: [GiftSchema],
    userId: {
        type: mongoose.Types.ObjectId,
        ref:'User'
    }
})

export default mongoose.model("Person", PersonSchema);
