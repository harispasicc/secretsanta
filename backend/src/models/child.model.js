import mongoose from "mongoose";
import GiftSchema from "./gift.model";

const ChildSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required:'Child name is required'
    },
    age: {
        type: Number,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer number'
          }
    },
    gifts: [GiftSchema],
    parent: {
        type: mongoose.Types.ObjectId,
        ref:'User'
    }
})

export default mongoose.model("Child", ChildSchema);
